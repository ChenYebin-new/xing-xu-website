# RFQ 从本地测试切换到正式投递

状态（2026-09-14）：本地代码、模拟邮件与 GitHub／Workers Builds CI 适配已完成并提交到 `main`，Cloudflare 已连接目标 GitHub 仓库；`xingxufan.com`、生产 Turnstile widget、Email Routing 和已验证目标邮箱已由账户所有者准备。隐藏的 `xing-xu-website` Worker 已创建，`TURNSTILE_SECRET` 与 `RFQ_TO_EMAIL` 已写入并完成名称核验。提交 `e1eee00` 的首次隐藏自动构建与部署已成功完成；部署日志显示没有发布目标，部署后 Dashboard 仍确认生产 `workers.dev`、Preview URL、Custom Domain 和正式 Route 均未启用，DNS 未修改，两个 Runtime Secret 保持加密状态。不要在聊天、Git、截图或 `.env` 提交中暴露 Turnstile secret。

## 当前本地模式

- `wrangler.jsonc` 使用 `RFQ_MODE = "local-test"`。
- hostname 只允许 `localhost` 与 `127.0.0.1`。
- `.dev.vars` 使用 Cloudflare 官方公开的 always-pass 测试 secret，并已被 Git 忽略。
- `RFQ_EMAIL` 在 `wrangler dev` 中是本地模拟绑定；邮件文本与 HTML 只写入 `.wrangler/tmp/email/`。
- 本地测试成功不代表 Gmail 已收到邮件。
- `wrangler.jsonc` 的 `production` 环境另行使用 `RFQ_MODE = "live"`、`xingxufan.com` 和正式发件地址；不会把 localhost 带入生产 hostname 列表。
- `turnstile_secret.txt` 保存生产 Sitekey、Secret、发件地址和目标地址，已被 Git 忽略。生产构建脚本只把公开 Sitekey 注入前端，不会把 Secret 或目标地址写入 `dist`。

## 是否必须先部署网站

不必。Turnstile 可以在网站部署前创建，测试密钥也可在 localhost 使用；正式 widget 只需提前知道准备使用的 hostname。

但真实 RFQ 邮件投递需要先准备一个由 Cloudflare 管理／验证的发件域名，并验证目标 Gmail。因此推荐顺序是：确定域名与 DNS → 创建 Turnstile widget → 开通 Email Service 发件域名与 Gmail 目的地址 → 由开发者写入非秘密配置和 Worker secret → 部署 Preview → 做真实投递验收。

## 需要账户所有者完成的操作

### 1. 确定正式域名

记录准备上线的 hostname，例如 `example.com` 与是否同时使用 `www.example.com`。如 Email Service 要从同一域名发件，该域名需要进入对应 Cloudflare 账号并按控制台要求完成 DNS 验证。

### 2. 创建 Turnstile widget

在 Cloudflare Dashboard 的 Turnstile 区域创建 Managed widget，并只添加正式 hostname。保存：

- Sitekey：公开值，可作为 `PUBLIC_TURNSTILE_SITE_KEY` 构建变量提供。
- Secret key：敏感值，只通过 Cloudflare secret 管理或本机 `wrangler secret put TURNSTILE_SECRET` 输入；不要发到聊天或写入仓库。

### 3. 配置 Email Service

本项目使用已启用的 Cloudflare Email Routing 域名和已验证目的地址，通过 Worker `send_email` binding 发送固定 RFQ 通知。目标邮箱已由账户所有者完成验证。

本机生产配置保存两个地址：

- `RFQ_FROM_EMAIL`：获批的域名发件地址。
- `RFQ_TO_EMAIL`：已验证的 Gmail 目的地址。

### 4. 让开发者完成生产配置

本地生产配置已完成：

- 默认环境继续保留安全的 `local-test` 回归流程。
- `production` 环境使用 `RFQ_MODE = "live"`，只允许 `xingxufan.com`，并限制 `send_email` 的发件地址和唯一目的地址。
- 目标邮箱作为 Worker secret 保存，不进入 Git；Email Routing 仍只允许发送到 Cloudflare 账号中已验证的目的地址。
- `npm run build:production` 从已忽略文件读取公开 Sitekey，构建后验证它已进入 RFQ 页面，但不显示实际值。
- `npm run cf:dry-run:production` 临时生成一份被忽略的 Wrangler 配置，把目标地址注入 binding，执行 `wrangler deploy --dry-run --env production` 后立即删除；命令输出会隐藏目标地址且不会写入 Cloudflare。

账户写入已完成：账号与 Worker 名称已经核对，两个 Secret 通过标准输入一次性写入，实际值未进入命令参数、Git、构建产物或持久日志。仓库把生产环境固定为 `workers_dev = false`、`preview_urls = false`；后续公开 Preview、绑定 `xingxufan.com` 和修改 DNS 仍须单独确认。

### 5. GitHub／Workers Builds 连接配置

仓库已经提供跨平台的 CI 构建与部署入口。Cloudflare Workers Builds 克隆 GitHub 仓库后不读取本机 `turnstile_secret.txt`，也不应获得 Worker 的运行时 Secret。

Cloudflare 的 `xing-xu-website` Worker 已按以下配置连接 GitHub：

| 设置 | 值 |
| --- | --- |
| Production branch | `main` |
| Root directory | `/`，使用仓库根目录 |
| Build command | `npm run ci:build` |
| Deploy command | `npm run cf:deploy:production` |
| Non-production branch builds | 第一轮关闭 |

同一 Worker 的 Build variables and secrets 已按以下分层配置并复核：

| 名称 | 类型 | 用途 |
| --- | --- | --- |
| `PUBLIC_TURNSTILE_SITE_KEY` | Build variable | 注入浏览器端的正式 Sitekey；它本来就是公开值 |
| `CI_RFQ_DESTINATION_ADDRESS` | Build secret | 仅用于生成限制为唯一已验证收件地址的 Email binding |

不要在 Build variables and secrets 中新增 `TURNSTILE_SECRET` 或 `RFQ_TO_EMAIL`：

- `TURNSTILE_SECRET` 是 Worker Runtime Secret，只供 `/api/rfq` 服务端调用 Siteverify。
- `RFQ_TO_EMAIL` 是 Worker Runtime Secret，只供 Worker 发送邮件时读取。
- `CI_RFQ_DESTINATION_ADDRESS` 是构建侧的同一收件目标副本，用于 Wrangler 的 `destination_address` 限制。以后更换目标邮箱时，需要同时更新它和 Runtime Secret `RFQ_TO_EMAIL`，但不要把值写入仓库。

`npm run ci:build` 会先从子进程环境移除收件地址、Worker Runtime Secrets 和 Cloudflare 部署凭据，再运行类型检查、测试及 Astro 构建；在缺少正式 Sitekey、使用测试 Sitekey、检查失败或正式 Sitekey 没有进入 RFQ 页面时都会失败。`npm run cf:deploy:production` 固定部署 `production` 环境，结构化生成临时配置并在成功、Wrangler 非零退出或异常后清理；它不会通过命令参数传递收件地址。脚本还会核对 Cloudflare 自动注入的 Worker 名称与账号覆盖值：如存在，必须分别匹配 `xing-xu-website` 和已批准账号；核对通过后原样保留给 Wrangler，让官方 CI match-tag 保护继续验证部署目标。根配置和 production 环境目前都明确设置 `workers_dev = false`、`preview_urls = false`，仓库也没有 `route`／`routes`。Wrangler 省略路由字段不会删除控制台中另行管理的 Route／Custom Domain，因此首次部署前后均已通过 Dashboard／API 确认生产与 Preview 的 `workers.dev` 入口关闭，Route／Custom Domain 为空；首次 GitHub 自动部署已验证保持隐藏。

首次隐藏构建验收记录：提交 `e1eee00` 的 Build 与 Deploy 均成功，生产构建生成 14 个页面并验证正式 Sitekey 已进入 RFQ 页面但未输出其值；Wrangler 上传 Worker 版本后报告 `No targets deployed`。部署后 Dashboard 复核 `ASSETS` 与 `RFQ_EMAIL` 绑定正常，`TURNSTILE_SECRET` 与 `RFQ_TO_EMAIL` 仍为加密的 Runtime Secret。

Cloudflare 当前构建镜像支持根目录 `.node-version`；仓库固定为 Node.js `24.18.0`。本地使用同一 Node 24 大版本即可执行验证。

### 6. Preview 与真实 Gmail 验收

部署获批 Preview 后至少检查：

1. 正常询盘只发送一封分组邮件，Gmail 实际收到。
2. 邮件包含来源页、UTC 提交时间与请求参考编号。
3. 缺失字段显示在对应控件旁，输入内容保留。
4. 过期或重复 Turnstile token 不发送邮件，并要求重新验证。
5. 邮件服务失败不进入成功页。
6. Worker 日志没有完整姓名、邮箱、WhatsApp 或询盘正文。

通过以上检查并批准最终隐私文字后，才可把 RFQ 标记为正式上线。
