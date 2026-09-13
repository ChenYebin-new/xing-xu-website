# XINGXU FAN Website

Quanzhou Xingxu Fan & Ventilation Supply 的独立英文 B2B 网站项目，第一目标市场为 Malaysia 和 the Philippines。

本仓库与既有网站完全隔离，不继承旧站代码、布局、文案或视觉系统。

## 当前状态

阶段 0～2 已完成并通过本地验收：

- Astro + TypeScript 静态项目骨架。
- Cloudflare Workers Static Assets 本地配置。
- Evidence-led Showroom 首页和响应式移动布局。
- Negative Pressure Fans、Axial Fans、Centrifugal Fans 三个产品分类入口。
- Distributors、Engineering Contractors、Equipment Manufacturers 三类买家路径。
- RFQ 界面预览和本地必填校验。
- 明确标记的产品概念图与 Storefront、Warehouse、Product、Nameplate 证据占位图。

当前 RFQ 不发送、不保存任何信息。真实联系方式、产品资料、企业实拍、后端邮件、Turnstile、隐私同意和正式部署尚未加入。

## 技术栈

- Astro 7
- TypeScript
- `@fontsource/barlow-condensed`
- Cloudflare Wrangler 4
- Cloudflare Workers Static Assets

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

## 项目结构

- `src/pages/index.astro`：首页与本地交互。
- `src/data/site.ts`：产品、买家、证据和联系方式的数据模型。
- `src/styles/global.css`：全局视觉系统和响应式样式。
- `src/assets/`：概念产品图、证据占位图及提示词溯源。
- `DESIGN.md`：已批准的设计系统。
- `DEVELOPMENT-PLAN.md`：阶段计划、验收标准与发布边界。
- `PRODUCT-DATA-CHECKLIST.md`：真实资料替换清单。
- `.impeccable/mocks/`：设计方向与批准构图的视觉依据。

## 内容与发布边界

- 不把概念图或生成占位图描述为真实产品、门店、仓库或铭牌。
- 不发布未经核实的型号、性能参数、认证、授权、客户、出口记录或制造商表述。
- 不提交环境变量、密钥、本地依赖、构建产物或本机工具状态。
- Cloudflare 部署、正式域名和生产 RFQ 流程需要单独验收与授权。

更多信息见 `PRODUCT.md`、`MARKET-AND-AUDIENCE.md`、`SITEMAP.md` 和 `DEVELOPMENT-PLAN.md`。
