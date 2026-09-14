# XINGXU FAN Website

Quanzhou Xingxu Fan & Ventilation Supply 的独立英文 B2B 网站项目，第一目标市场为 Malaysia 和 the Philippines。

本仓库与既有网站完全隔离，不继承旧站代码、布局、文案或视觉系统。

## 当前状态

阶段 0～2 已完成并通过本地验收；阶段 3 已完成并由用户验收；阶段 4 的本地实现、生产配置和隐藏 Worker 账户写入已完成。正式域名、Turnstile widget、Email Routing 和目标邮箱验证已准备好，两个 Worker Secret 已配置；尚待公开 Preview／正式域名部署与一次真实收件验收：

- Astro + TypeScript 静态项目骨架。
- Cloudflare Workers Static Assets 本地配置。
- Evidence-led Showroom 首页和响应式移动布局。
- Negative Pressure Fans、Axial Fans、Centrifugal Fans 三个产品分类入口。
- Distributors、Engineering Contractors、Equipment Manufacturers 三类买家路径。
- 独立 RFQ 页面、条件字段、前端与 Worker 双重校验、提交锁定、失败保留和成功确认状态。
- Turnstile 服务端 Siteverify 校验，生产模式强制检查 `action=rfq` 与正式 hostname。
- Cloudflare Email Service 绑定、分组文本／HTML 邮件和不记录完整询盘正文的安全日志。
- Wrangler `local-test` 模式：使用 Cloudflare 测试密钥和本地模拟邮箱完成端到端测试，不发送真实邮件。
- 明确标记的产品概念图与 Storefront、Warehouse、Product、Nameplate 证据占位图。
- 产品分类总览与三个分类选型说明页；没有真实资料时不生成 SKU 页面。
- Distributors、Contractors、Equipment Manufacturers 三个合作对象详情页。
- About、Contact、Privacy、带会话确认保护的 Thank You 状态和自定义 404 页面。
- 全站共享导航、页脚、面包屑和下一步行动组件。

当前 RFQ 仍没有公开入口：默认环境通过 Turnstile 测试验证，并由 Wrangler 的模拟邮件绑定接收；不会发送到真实邮箱。独立 `production` 环境已经切换为 `live`、正式 hostname 和正式发件地址；本机生产构建由被忽略的本地配置注入 Sitekey，Workers Builds 则从普通 Build variable 注入。Turnstile secret 与目标邮箱已安全写入隐藏 Worker。Cloudflare API 已验证该 Worker 没有 `workers.dev`、Preview URL、Custom Domain 或 Route；最终隐私文本、公开部署和真实投递仍待验收。

## 技术栈

- Astro 7
- TypeScript
- `@fontsource/barlow-condensed`
- Cloudflare Wrangler 4
- Cloudflare Workers Static Assets
- Cloudflare Turnstile
- Cloudflare Email Service
- Vitest + Cloudflare Workers Vitest integration

## 本地运行

```powershell
npm install
npm run dev
```

生产构建与本地预览：

```powershell
npm run build
npm run preview
```

Cloudflare 配置的本地打包检查：

```powershell
npm run cf:dry-run
```

使用被 Git 忽略的本机配置执行生产构建与 Cloudflare dry-run：

```powershell
npm run build:production
npm run cf:dry-run:production
```

## GitHub 与 Cloudflare Workers Builds

正式发布采用 GitHub 作为源码与版本记录、Cloudflare Workers Builds 作为构建触发器、现有 `xing-xu-website` Worker 作为运行环境；不使用 GitHub Pages，也不需要提交 `.github/workflows/`。

Cloudflare Builds 使用以下仓库命令：

```text
Build command:  npm run ci:build
Deploy command: npm run cf:deploy:production
```

- `ci:build` 依次运行 Worker 类型检查、全部测试、Wrangler 类型一致性检查和正式 Astro 构建。
- 构建必须提供普通 Build variable `PUBLIC_TURNSTILE_SITE_KEY`；缺失或仍是 Cloudflare 测试 Sitekey 时会在构建前失败。
- 部署必须提供 Build secret `CI_RFQ_DESTINATION_ADDRESS`；脚本只用它生成受限的临时 Email binding 配置，完整捕获并脱敏 Wrangler 输出，随后删除临时配置和本次日志。
- `TURNSTILE_SECRET` 与 `RFQ_TO_EMAIL` 继续只作为 Worker Runtime Secrets 存在，不提供给构建脚本。
- Wrangler 命令固定使用 `--env production`；根配置与 production 环境都关闭 `workers.dev` 和 Preview URL，仓库也不声明 Route。由于省略 `route`／`routes` 不会删除控制台中另行管理的路由，首次部署前还必须通过 Dashboard／API 再确认没有 Custom Domain 或 Route；按当前已核验快照，首次隐藏部署不会公开网站。
- `.node-version` 固定 Cloudflare 构建使用的 Node.js 版本，避免默认小版本变化造成无记录的构建差异。

Cloudflare 控制台的具体字段和值以及 Secret 分层见 `RFQ-SETUP.md`。GitHub 连接、正式域名和 DNS 仍需后续单独授权。

完整 Worker 本地运行与测试：

```powershell
Copy-Item .dev.vars.example .dev.vars
npm run cf:dev
npm test
npm run check:worker
```

`.dev.vars` 与 `turnstile_secret.txt` 已被 Git 忽略。示例值是 Cloudflare 官方公开测试密钥，不得把生产 secret 写入仓库或聊天。生产接入见 `RFQ-SETUP.md`。

## 项目结构

- `src/pages/`：首页、产品、合作对象和说明型静态页面。
- `src/components/`：共享导航、页脚、面包屑和行动区。
- `src/data/site.ts`：产品、买家、证据和联系方式的数据模型。
- `src/lib/rfq.ts`：RFQ 数据边界、服务器校验和邮件格式化。
- `worker/index.ts`：Static Assets 路由、Turnstile 验证和邮件投递端点。
- `test/rfq.spec.ts`：RFQ 校验、Turnstile 与投递状态自动化测试。
- `src/styles/global.css`：全局视觉系统和响应式样式。
- `src/assets/`：概念产品图、证据占位图及提示词溯源。
- `DESIGN.md`：已批准的设计系统。
- `DEVELOPMENT-PLAN.md`：阶段计划、验收标准与发布边界。
- `PRODUCT-DATA-CHECKLIST.md`：真实资料替换清单。
- `RFQ-SETUP.md`：从本地测试切换到 Cloudflare 正式投递的交接步骤。
- `.impeccable/mocks/`：设计方向与批准构图的视觉依据。

## 内容与发布边界

- 不把概念图或生成占位图描述为真实产品、门店、仓库或铭牌。
- 不发布未经核实的型号、性能参数、认证、授权、客户、出口记录或制造商表述。
- 不提交本地环境文件、真实 Secret、目标邮箱、本地依赖、构建产物或本机工具状态；仓库只保留明确列出的非敏感配置名与示例值。
- Cloudflare 部署、正式域名和生产 RFQ 流程需要单独验收与授权。

更多信息见 `PRODUCT.md`、`MARKET-AND-AUDIENCE.md`、`SITEMAP.md` 和 `DEVELOPMENT-PLAN.md`。
