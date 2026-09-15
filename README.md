# XINGXU FAN Website

Quanzhou Xingxu Fan & Ventilation Supply 的独立英文 B2B 网站项目，第一目标市场为 Malaysia 和 the Philippines。

本仓库与既有网站完全隔离，不继承旧站代码、布局、文案或视觉系统。

## 当前状态

状态更新（2026-09-15，依据用户交接与本任务前序只读核验）：阶段 0～3 已完成并由用户验收；阶段 4 的本地实现、生产配置和 Workers Builds 构建部署已完成。网站已通过 `https://xingxufan.com` 公开运行，`www` 跳转及 Email Routing 已由用户完成，Turnstile widget、已验证目标邮箱和两个 Worker Runtime Secrets 已配置。RFQ 已通过校验与 Turnstile，但仍在 `RFQ_EMAIL.send(...)` 步骤返回 `delivery_failed`，真实 Gmail 收件尚未验收，阶段 4 不标记为完成。

已实现的功能：

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

公开 RFQ 页面现已可访问，但邮件转化链路尚未完整可用。默认环境仍使用 `local-test` 和 Wrangler 模拟邮件，不发送真实邮件；独立 `production` 环境使用 `live`、正式 hostname 和正式发件地址。Workers Builds 从普通 Build variable 注入公开 Sitekey，Turnstile secret 与目标邮箱只作为 Worker Runtime Secrets 保存。历史提交 `e1eee00` 的首次部署曾在没有公开入口时完成隐藏验证；该历史结果不再代表当前正式域名的部署状态。

### 本次 RFQ 安全诊断补丁

- 邮件发送失败日志保留请求参考编号，并增加白名单 `errorCode`、固定 `errorCategory` 和可选的 400～599 整数 `httpStatus`。不记录原始错误消息、堆栈、任意未知错误码、邮箱、客户资料、询盘、Token 或 Secret。
- 未识别的异常降级为 `UNKNOWN`／`unknown`；前端仍返回通用 `502 delivery_failed`，不泄露内部诊断，也不进入成功页。
- RFQ 自动化测试显式注入模拟运行时，在本地 Workers runtime 中执行并禁用远程绑定，不加载 Wrangler 配置或 `.dev.vars`。这些测试不证明真实邮件绑定有效或 Gmail 已收件。

本补丁用于获取安全诊断信息，不是已确认的生产故障修复。推送后需确认 Workers Builds 已部署对应提交，再由用户提交测试询盘，用新的请求参考编号核对日志，最后完成真实 Gmail 收件验收。具体步骤见 `RFQ-SETUP.md`。

本地验收记录（2026-09-15）：`npm run ci:build` 通过，包含 63 项 RFQ 测试、12 项 CI 脚本测试、Worker 类型检查与 Wrangler 生成类型一致性检查；Astro 检查 23 个文件，错误、警告与提示均为 0，并构建 14 个页面。该记录不包含本次补丁的线上部署或真实 Gmail 收件验收。

### 全站 UI 优化

用户已确认首页与 Products 的 1440px 桌面和 390px 手机预览，并授权扩展到全站。全部 14 个已有页面已应用统一布局：

- 首页和 Products 的六张分类卡片使用单个原生链接，标题、图片、说明、空白和箭头区域均可导航；每卡一个 Tab 焦点，支持 Enter 和新标签页打开。
- 内容最大宽度 1440px，导航与页脚对齐；桌面区块间距 40～64px，手机主要使用 32px。内页主标题最大 64px／44px，Products、Contact 和询价页标题按确认方案精简。
- 分类卡片按桌面三列、平板两列、手机一列展示，平板末卡等宽居中；首页和产品详情在 900px 及以下堆叠，缩小过高的图片展示区与长句说明。
- 合作伙伴、About、Contact、询价、隐私和状态页压缩多余间距，文字卡片取消强制高度；询价控件至少 52px，并修正无效提交时未聚焦首个错误控件的既有问题。

本次保留图片来源、概念图标识、业务事实与原有买家切换、询价参数、条件字段和提交协议，没有新增公共页面、接口、数据结构或依赖。设计规则已同步至 `DESIGN.md` 和相关 surface 文档。

本地验证（2026-09-15）：Astro 检查与构建通过，23 个文件零错误／警告／提示并生成 14 个页面；`npm run check:ci` 通过，包含 Worker 类型检查、63 项 Vitest、12 项 Node CI 测试及 Wrangler 生成类型一致性检查。81 个布局检查与 31 个定向复核未发现横向溢出、内容越界或失败图片；20 组浏览器功能场景经完整回归和首个错误焦点的定向修复复核通过。1440×900 的 Products 首屏可看到三张分类卡片的标题和主图。

全站桌面／手机截图、优化前后对比及详细证据保存在被 Git 忽略的 `.impeccable/review/`，不进入网站构建或源码提交。一次设计检测的工具输出被截断，完整计数不可确认，相关限制与人工视觉审查结论已记录。浏览器询价提交采用本地模拟，这些 UI 结果不证明真实邮件投递。线上效果以对应提交的 Workers Builds 部署结果为准。

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
- Wrangler 部署命令固定使用 `--env production`；根配置与 production 环境都关闭 `workers.dev` 和 Preview URL，仓库不声明 Route。控制台另行管理正式域名与必要路由；仓库省略 `route`／`routes` 不会删除这些控制台设置。历史首次隐藏部署已通过核验，当前正式域名已公开运行。
- `.node-version` 固定 Cloudflare 构建使用的 Node.js 版本，避免默认小版本变化造成无记录的构建差异。

Cloudflare 控制台的字段和 Secret 分层见 `RFQ-SETUP.md`。GitHub／Workers Builds 连接与正式域名部署已完成；推送 `main` 会按现有连接触发自动构建部署。以后修改 DNS、域名／Route、Build variables、Runtime Secrets 或邮件权限，仍需要单独授权，不属于普通 Git 发布。

手动运行完整 Worker 本地模拟（只使用公开测试密钥）：

```powershell
Copy-Item .dev.vars.example .dev.vars
npm run cf:dev
```

自动化回归检查不需要 `.dev.vars`，不会发送真实邮件：

```powershell
npm test
npm run check:worker
npm run check:ci
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
- 历史首次隐藏 Cloudflare 构建结果已核验，当前正式域名已公开运行；生产 RFQ 仍在邮件发送步骤失败，真实 Gmail 收件与最终隐私文本仍须验收，不得把本地测试或构建成功当作投递成功。

更多信息见 `PRODUCT.md`、`MARKET-AND-AUDIENCE.md`、`SITEMAP.md` 和 `DEVELOPMENT-PLAN.md`。
