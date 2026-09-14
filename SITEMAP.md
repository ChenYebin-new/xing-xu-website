# 英文海外网站地图与询盘路径

状态：首版信息架构
网站：Quanzhou Xingxu Fan & Ventilation Supply
默认语言：English
目标市场：Malaysia and the Philippines
更新时间：2026-09-13

## 1. 网站任务

网站采用 Persuade 模式：先让目标企业相信 XINGXU FAN 是真实且值得沟通的供应伙伴，再帮助其找到相关产品或应用，最后进入可执行的询盘。

全站信息顺序遵循：

```text
Identity and proof
→ Product or application relevance
→ Technical confidence
→ Cooperation fit
→ Contact or structured RFQ
```

## 2. 一级导航

```text
Home
Products
Applications
Partner With Us
Resources
About
Request a Quote
```

桌面端 `Request a Quote` 为持续可见的主行动；移动端提供易触达但不遮挡内容的 RFQ 与 WhatsApp 入口。

## 3. 路由与页面清单

| 路由 | 页面 | 主要受众 | 页面目标 | 主要行动 |
|---|---|---|---|---|
| `/` | Home | 全部 | 建立身份、范围和可信度 | Explore Products / Request a Quote |
| `/products/` | Products | 全部 | 浏览全部已发布产品 | Select Category |
| `/products/negative-pressure-fans/` | Negative Pressure Fans | 经销商、承包商 | 理解分类与候选产品 | View Product / Send RFQ |
| `/products/axial-fans/` | Axial Fans | 经销商、承包商、设备商 | 理解分类与候选产品 | View Product / Send RFQ |
| `/products/centrifugal-fans/` | Centrifugal Fans | 承包商、设备商、经销商 | 按工况和参数寻找产品 | View Product / Ask for Selection |
| `/products/{category}/{slug}/` | Product Detail | 全部 | 判断单个型号是否值得询价 | Request Quote for This Product |
| `/applications/` | Applications | 承包商、非专业采购者 | 按使用场景找到产品方向 | Choose Application |
| `/applications/{slug}/` | Application Detail | 承包商、终端项目方 | 解释需求、关键参数和产品方向 | Submit Project Requirements |
| `/partners/distributors/` | For Distributors | 经销商 | 说明渠道合作与供货流程 | Distributor Inquiry |
| `/partners/contractors/` | For Contractors | 工程承包商 | 说明选型和项目配合流程 | Project RFQ |
| `/partners/manufacturers/` | For Equipment Manufacturers | 设备制造商 | 说明设备集成和批量采购流程 | Integration Inquiry |
| `/resources/` | Resources | 全部专业买家 | 集中提供目录、图纸和技术资料 | Download / Request Missing File |
| `/about/` | About | 全部 | 用真实历史、场所与能力建立信任 | Contact Us |
| `/contact/` | Contact | 全部 | 提供所有已授权公开渠道 | Open Channel |
| `/request-a-quote/` | RFQ | 全部 | 收集可报价需求 | Submit Inquiry |
| `/privacy/` | Privacy | 全部 | 解释询盘数据用途和联系权利 | — |
| `/thank-you/` | Submission Success | 已提交访客 | 确认收到并说明下一步 | WhatsApp / Continue Browsing |
| `/404/` | Not Found | 全部 | 从错误链接恢复 | Products / Home / RFQ |

具体产品和应用 slug 只在真实内容确认后创建，不上线空白、虚构或只有“敬请期待”的索引页。

## 4. 首页内容顺序

1. **Identity and proof**：XINGXU FAN 是什么、位于哪里、服务谁；首屏同时展示门店、仓库、产品和铭牌四类真实证据位置，以及经营约三十年的准确表述。
2. **Capabilities**：选型建议、跨品牌采购、出口包装与物流协调。
3. **Primary product categories**：负压、轴流和离心风机。
4. **Buyer paths**：经销商、承包商、设备制造商三个入口，经销商优先。
5. **RFQ work area**：吸收已确认的询价侧栏设计，收集产品类别、数量、参数和目的地，并提供多渠道联系方式。
6. **Applications**：用真实场景帮助客户理解产品方向。
7. **How cooperation works**：需求、选型、报价、包装与物流协调。
8. **Featured products**：只展示资料完整且允许公开的型号。
9. **Contact channels**：Facebook、WhatsApp、Gmail、WeChat。

首页不放未经证实的客户 Logo、全球地图、出口国家数量、认证徽章、产能数字或库存数字。

## 5. 产品列表与分类页面

### 产品列表

支持按以下条件浏览，筛选项只在有足够数据时启用：

- Category。
- Application。
- Airflow range。
- Pressure range。
- Motor power。
- Voltage / Phase / Frequency。
- Drive type。
- Material。

产品数量较少时不展示无意义的复杂筛选器，优先使用清晰的分类和比较信息。

### 分类页面结构

1. 分类定义与典型用途。
2. 选型时需要关注的参数。
3. 适用与不适用边界。
4. 已发布产品。
5. 找不到准确型号时的 Selection Request。

## 6. 产品详情模板

每个详情页包含：

1. 产品名称、型号和明确分类。
2. 真实主图与图集。
3. 一句话用途说明。
4. 关键参数摘要。
5. 完整技术参数表。
6. 性能曲线、尺寸图和文档；仅在已确认时显示。
7. 应用场景和选型注意事项。
8. 材质、电机、结构与可选配置。
9. 包装、MOQ、交期和质保；根据公开策略显示或在询盘后提供。
10. 与当前型号绑定的 RFQ 按钮。
11. WhatsApp 与 Email 备用入口。

缺失参数不显示虚构值，也不使用 `Typical`、`Standard` 等模糊词掩盖缺失。必要时显示简短说明：具体配置需在询盘后确认。

## 7. 应用页面

首批候选应用，需根据真实产品能力确认后上线：

- Factory and Workshop Ventilation。
- Warehouse Ventilation。
- HVAC / ACMV Projects。
- Dust Collection and Process Exhaust。
- Equipment Integration。
- Greenhouse or Agricultural Ventilation。

应用页面不承诺完整工程设计，主要说明：

- 场景中的通风问题。
- 选型需要的输入。
- 可能使用的风机类别。
- 风量、压力、环境和电气条件为何重要。
- 何时需要当地工程师、承包商或合规确认。

## 8. 三类合作页面

### For Distributors

- 产品范围与资料获取方式。
- 跨品牌采购能力。
- 批量询价与样品流程，确认后发布。
- 包装和物流协调。
- 不绕过渠道等合作政策只有在企业明确承诺后才能写入。

### For Contractors

- 选型需要提交的工况。
- 参数、图纸与文件提供范围。
- 项目询价步骤。
- 当地标准和最终工程审批由项目专业方确认。

### For Equipment Manufacturers

- 设备集成所需数据。
- 批量一致性、样品与变更信息，确认后发布。
- OEM、定制和贴牌能力在获得证据前不出现。

## 9. RFQ 表单

### 必填字段

- Customer type：Distributor / Contractor / Equipment Manufacturer / Other。
- Full name。
- Company name。
- Country / Region。
- Email or WhatsApp，至少一种可回复方式。
- Product category or product model。
- Quantity。
- Destination city / port。
- Requirement summary。
- Privacy acknowledgement。

### 条件字段

根据产品或 `Need selection help` 选择显示：

- Application。
- Airflow。
- Static or total pressure。
- Voltage / Phase / Frequency。
- Motor power。
- Dimensions or installation opening。
- Material requirement。
- Operating temperature and medium。
- Required delivery date。
- Trade term if known。

### 选填与待定

- Drawing or specification upload，首版不加入；后续需单独设计安全与保留策略。
- Preferred contact channel。
- Existing supplier or replacement model。
- Additional message。

### 表单状态

- 初始状态：解释预计填写时间和必填信息。
- 验证状态：字段旁显示具体问题，不清空已填内容。
- 防垃圾验证：Turnstile 由服务器端验证，不能只嵌入前端控件。
- 提交中：防止重复提交。
- 成功：只有邮件服务接受投递后才显示确认与请求参考编号；直接访问 Thank You 页面不证明已提交。
- 失败：说明信息未发送并保留当前页面内容；备用联系方式只在其公开信息获批后提供。

### 数据边界

- 第一版只收集报价所需信息。
- 不收集证件号码、银行卡等无关敏感数据。
- 首版不建立询盘数据库；完整询盘只进入获批邮箱，保留期限与邮箱访问权限须在上线前确认。
- Gmail 是公开联系邮箱；表单通知可发送至已验证 Gmail 目的地址，但必须在上线前进行真实投递测试。

## 10. 关键访问路径

### 经销商

```text
Outreach link
→ Product category or For Distributors
→ Real company and product proof
→ Product shortlist
→ Distributor Inquiry
→ WhatsApp / Email follow-up
```

### 工程承包商

```text
Search or shared product link
→ Application or Product Detail
→ Parameters, drawings and boundaries
→ Need selection help
→ Project RFQ
```

### 设备制造商

```text
Product or integration link
→ Product Detail
→ Dimensions, electrical data and repeatability
→ Equipment Integration Inquiry
```

## 11. 全局组件

- Header navigation。
- Language indicator，首版仅 English，不显示无内容的语言切换。
- Breadcrumbs。
- Product cards。
- Technical specification table。
- Evidence gallery。
- Download item。
- Audience-specific CTA。
- Contact channel group。
- RFQ entry and form。
- Footer with public identity and authorized contact details。

组件定义只描述职责，具体外观在视觉效果图阶段决定。

## 12. 响应式与可访问性要求

- 手机和电脑端都能完成产品浏览与 RFQ。
- 技术表格在小屏幕上保持字段对应关系，不依赖横向无限滚动。
- 表单具备永久标签、错误摘要、键盘操作和清晰焦点。
- 点击区域适合触屏。
- 图片有准确替代文本，装饰图片不制造噪声。
- 页面在图片未加载、脚本失败和慢速网络下仍能读取核心内容与联系方式。
- 尊重减少动态效果偏好。

## 13. SEO 与后续多语言准备

- 每个真实产品拥有稳定且可读的 URL。
- 产品标题、型号、参数和应用内容来自同一数据记录。
- 生成 sitemap、robots、canonical 和社交分享元数据。
- 结构化数据只表达页面上真实可见且符合要求的信息。
- 首版为 English；后续增加语言时使用独立语言 URL 和明确语言标注。
- 不根据 IP 强制跳转国家或语言。

## 14. 初步技术与部署决策

- 前端：Astro + TypeScript，静态优先。
- 产品数据：Astro Content Collections 或等价的带 schema 的结构化内容。
- 部署：Cloudflare Workers + Static Assets，而不是把新项目默认建立在 Pages 上。
- 表单：Worker API endpoint。
- 防垃圾：Cloudflare Turnstile，服务器端 Siteverify。
- 通知：优先评估 Cloudflare Email Service 向已验证 Gmail 目的地址发送通知。
- 数据库：首版默认不启用；若需要审计、失败恢复或销售管理，再评估 D1。
- 发布方式：开发完成后再决定 Git 自动部署细节，不在规划阶段连接账号或部署。

选择 Workers 的原因是 Cloudflare 当前建议新项目从 Workers 开始，Static Assets 可以与 API 逻辑一并部署。Astro 官方也提供面向 Cloudflare Workers 的静态和按需部署路径。

参考：

- [Cloudflare Pages getting started](https://developers.cloudflare.com/pages/get-started/)
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Astro deployment on Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/get-started/)
- [Cloudflare Email Routing addresses](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/)

## 15. 首版明确不做

- 在线购物车和付款。
- 公开户内采购成本或固定出口价格。
- 实时库存和自动运费。
- 客户账号、经销商后台或 ERP。
- 自动完成工程选型。
- 未经证实的认证、案例、产能或全球客户展示。
- 马来语、中文或其他多语言页面。
- 为增加页面数量而发布空产品和空应用页面。
