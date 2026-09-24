# 墟 · XU 开源知识库

> 知识有所归，也由此再出发。

[在线访问](https://xu.lucifer-cgl.workers.dev/) · [国内入口](https://lucifer.gicp.fun/) · [提交问题或建议](https://github.com/Lucifer-cgl/XU/issues) · [墟 · AI Assistant](https://github.com/Lucifer-cgl/XU-AI-Assistant)

“墟”取意于“归墟”。这个项目希望让分散的课程笔记有一处稳定归档，也让知识在记录、分享、修订和再次阅读中持续流转。

XU 是一个以 GitHub 为内容仓库、以 Cloudflare Workers Static Assets 为主发布平台的纯静态课程知识库。维护者只需在 `content/` 中增加或修改文件，构建程序就会自动生成目录、搜索索引和下载清单；访客可以在线阅读、搜索、复制原文、下载原文件，并通过浏览器打印为 A4/PDF。

当前有两个访问入口：

- Cloudflare 主站：<https://xu.lucifer-cgl.workers.dev/>，随 GitHub 更新自动构建，更新最快；
- 国内入口：<https://lucifer.gicp.fun/>，通过花生壳/贝锐静态托管提供国内直连访问，适合不方便使用网络代理的访客；由于该平台需要手动上传 `dist/` 产物，内容可能比主站滞后，通常按维护者节奏同步。

## 它解决什么问题

- 课程资料散落在 Word、PDF、截图和聊天记录里，难以统一维护。
- Markdown 公式、表格和长文章在不同平台上的排版不稳定。
- 每次新增课程都手工修改导航，容易遗漏。
- 服务端数据库、账号和评论系统会增加费用与维护负担。
- 批量生成 PDF 或 ZIP 会把计算和存储压力留在服务器。

XU 的策略是：**内容进入 Git，索引在构建时生成，阅读与下载在浏览器完成，静态文件由 Cloudflare 分发。**

## 当前能力

- 自动扫描任意层级的课程目录。
- 同时支持 Markdown 和完整 HTML。
- Markdown 按需转换为安全 HTML。
- KaTeX 数学公式与 MathML 输出。
- 所有 Markdown 表格统一显示为三线表。
- 文章目录、锚点跳转、面包屑和前后篇导航。
- 构建阶段生成轻量静态全文搜索索引。
- 单篇原文件下载与原文复制。
- 课程级原文件批量下载，浏览器本地分批、限并发、流式写盘。
- 浏览器原生 A4 打印与 PDF 保存。
- 明暗主题、桌面与移动端响应式布局。
- DOMPurify 清理、CSP 和基础安全响应头。
- GitHub Actions 内容检查与 Cloudflare Git 自动部署。
- 无后端、无数据库、无用户账户、无服务端 ZIP/PDF 任务。

## 墟 · AI Assistant

XU 提供可选的浏览器配套工具 [XU-AI-Assistant](https://github.com/Lucifer-cgl/XU-AI-Assistant)。它不是新的 AI 模型，而是帮助访客在阅读 XU 时调用自己已经登录的 ChatGPT、Gemini、DeepSeek、通义千问或豆包账号。

- 可读取用户选中的文字、当前章节或整篇文章；
- 发送前展示完整预览，由用户决定是否继续；
- 页面“墟”入口可自由拖动并记住位置；
- 打开助手时默认收起本文目录，但仍可通过分栏图标手动展开；
- 文章内容、用户提问和组合提示词均可按需复制；
- 宽屏设备按显示器可用区域自动排列为 XU 左侧约 70%、AI 右侧约 30%，关闭 AI 后恢复 XU 原窗口；
- 不要求 API Key，不保存账号、密码、文章或对话记录；
- 所有处理均在访客浏览器中完成，不增加 XU 的服务器、数据库或模型费用。

安装、更新、数据保存位置及常见问题见 XU 站内文章《墟 · AI Assistant：安装与使用》，源文件位于 [`content/自我介绍/墟-AI Assistant：安装与使用.md`](content/自我介绍/墟-AI%20Assistant：安装与使用.md)。

## XU 本地文档工作台

XU 可以连接独立下载的 `XU-Office-Editor` 目录，把其中约 250 MiB 的 LibreOffice WebAssembly 运行组件作为本地文档引擎使用。大型组件不会进入 XU 仓库，也不会随公共知识库首屏加载。

- XU 继续负责公共资源、“我的资源”、公共/本地混合标签、右侧目录和书签；
- 用户选择文件夹时只建立目录索引，点击具体文件后才读取内容；
- PDF、Markdown、Word、Excel 和 PowerPoint 在 XU 中间区域使用无外壳工作台打开；
- 运行组件由用户下载一次并放在固定目录，后续由 XU 通过授权的本地目录句柄读取；
- 文档内容和运行组件都不会上传到 XU。

当前本地联调时，在“我的资源”底部选择 `XU-Office-Editor` 仓库根目录即可。正式发行包与国内镜像准备完成后，下载入口会写入站内文章《XU 本地文档工作台：安装与使用》。

## 本地预览

双击仓库根目录下的 `preview-local.cmd`，或运行 `npm run preview:local`，即可先生成与线上一致的 `dist`，再启动只供本机访问的静态预览页并自动打开浏览器。`dist` 和临时内容目录都被 `.gitignore` 忽略，不会推送或发布到网页仓库；Office 编辑器运行包仍然保持在独立仓库中。

## 两条内容通道

### Markdown

`.md` 文件由浏览器按需读取，经过 Marked 与 marked-katex-extension 一次解析，再由 DOMPurify 清理。统一主题负责中文排版、公式、三线表、代码块、图片和打印样式。

适合需要持续维护、搜索和统一排版的课程笔记。

### 完整 HTML

`.html` 或 `.htm` 文件作为作者已经排版完成的独立页面直接发布，不强制套用 Markdown 阅读模板。

适合特殊可视化、独立专题页或已有完整设计的内容。构建阶段会拒绝危险脚本、内联事件、表单和不受控嵌入。

## 工作流程

```text
content/ 原始课程文件
        │
        ▼
scripts/build-content.mjs
├── 校验 Markdown 与 HTML
├── 复制原始内容到 public/content
├── 生成 catalog.json
├── 生成 search-index.json
└── 生成 downloads.json
        │
        ▼
Vite 打包站点外壳、样式与自托管依赖
        │
        ▼
dist/ 静态产物
        │
        ▼
Cloudflare Workers Static Assets
        │
        ▼
访客浏览器按需阅读、搜索、打印与下载
```

## 仓库结构

```text
XU/
├── content/                     # 唯一的课程内容入口
│   ├── 某个分类/
│   │   └── 某门课程/
│   │       ├── course.json      # 可选：名称、说明、顺序
│   │       ├── 01-章节.md
│   │       ├── 02-专题.html
│   │       └── assets/          # 课程图片和附件
│   └── 自我介绍/
│       └── 知识库平台_PRD.md
├── 支持/                         # 首页品牌与支持素材
├── src/
│   ├── main.js                  # 路由、目录、搜索与阅读器
│   ├── download.js              # 浏览器端课程下载
│   ├── page.js                  # 按需触发浏览器打印
│   ├── styles.css               # 阅读主题、首页与三线表
│   └── print.css                # A4 打印规则
├── scripts/
│   └── build-content.mjs        # 内容校验与清单生成
├── public/
│   ├── _headers                 # 缓存与安全响应头
│   └── static/html-tools.js     # 独立 HTML 可使用的受控工具
├── .github/workflows/quality.yml
├── index.html
├── vite.config.js
├── wrangler.jsonc
└── package.json
```

`public/content/`、`public/generated/` 和 `dist/` 都是构建产物，已被 Git 忽略，不应手工编辑。

## 添加一门课程

1. 在 `content/` 下创建有意义的目录层级。
2. 放入 Markdown、HTML、图片或其他需要随课程下载的原始附件。
3. 可选创建 `course.json`：

```json
{
  "name": "财务管理 A",
  "description": "课程复习笔记与例题",
  "order": 10
}
```

4. 运行 `npm run build`。
5. 检查阅读、公式、表格、搜索和打印效果。
6. 提交并推送；Cloudflare 会自动重新构建。

不需要手工修改首页课程卡片、左侧目录或搜索索引。

## 内容规范

### Markdown

- 每篇文章必须且只能有一个一级标题。
- 标题层级不得跳级。
- 行内公式使用 `$...$`，独立公式使用 `$$...$$`。
- 表格使用标准 Markdown 表格语法，网页统一渲染为三线表。
- 图片必须提供替代文本，并尽量放在所属课程目录内。
- 外部链接使用 HTTPS。
- 文件名前可使用两位或三位数字控制自然排序。
- 公式、普通段落和数据表不要用截图替代。

### HTML

- HTML 会作为独立页面发布。
- 不允许自定义脚本、内联事件属性、`javascript:` 链接、表单、iframe、object 或 embed。
- 如确需脚本，只能引用仓库提供的 `/static/html-tools.js`。
- 不要依赖运行时第三方 CDN，以免外部服务失效导致页面不可用。

## 本地开发

需要 Node.js 22 或兼容版本。

```bash
npm ci
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

常用命令：

| 命令 | 用途 |
|---|---|
| `npm run content:build` | 校验内容并生成三份静态清单 |
| `npm run dev` | 生成内容后启动本地开发服务器 |
| `npm run build` | 生成 `dist/` 正式静态站点 |
| `npm run preview` | 本地预览正式构建结果 |

## 为什么足够轻量

| 策略 | 结果 |
|---|---|
| 原生 JavaScript + Vite | 没有 React、Vue 等运行时框架 |
| 文章按需请求 | 首页不会下载所有课程正文 |
| 搜索索引构建时生成 | 浏览器不遍历远程仓库 |
| 公式单次解析 | 不进行“保护公式—解析正文—再次解析公式”的重复流程 |
| 打印使用浏览器原生能力 | 没有 Paged.js，也没有服务端 PDF |
| 批量下载由浏览器完成 | 没有 JSZip、服务端压缩包或临时文件 |
| 指纹静态资源长期缓存 | 重复访问减少传输 |
| 核心依赖随站点发布 | 不依赖运行时第三方 CDN |

运行时依赖只有：

- `marked`：Markdown 解析；
- `marked-katex-extension`：在同一次 Markdown 解析中识别公式；
- `katex`：公式排版；
- `dompurify`：HTML 安全清理。

构建工具只有 Vite 与 Wrangler。

## 下载策略

课程下载入口位于左侧目录每门课程右侧的“⋯”。

- 下载的是仓库中原始文件，不是转化后的 HTML 或 PDF。
- 清单只保存路径、大小和课程归属，不保存压缩包。
- 默认每批最多 50 个文件、100 MiB。
- 能完整放入批次的课程不会被拆散；只有单门课程自身超限时才拆分。
- 桌面端最多并发 3 个文件，移动端最多并发 2 个文件。
- 文件通过响应流直接写入访客选择的目录，并保留原层级。
- Chrome 和 Edge 可选择目录批量保存；不支持目录 API 的浏览器会显示原文件下载链接。

## 打印与 PDF

点击文章中的“A4 / PDF”后，站点才按需加载打印样式并调用浏览器打印对话框。

- 默认 A4；
- 每页顶部重复显示“墟 · XU 开源知识库 / 首页 / 课程路径 / 文档标题”；
- 页码由 CSS 页边距规则生成；
- 公式、图片、引用和代码块尽量避免跨页；
- 表格允许分页并重复表头；
- 导航、按钮和无障碍跳转入口不会进入打印内容。

不同浏览器和字体环境可能造成少量分页差异，推荐使用最新版 Edge 或 Chrome。

## 部署

- Worker 名称：`xu`
- 生产分支：`main`
- 构建命令：`npm run build`
- 部署命令：`npx wrangler deploy`
- 静态目录：`dist/`
- Cloudflare 主站：<https://xu.lucifer-cgl.workers.dev/>
- 国内入口：<https://lucifer.gicp.fun/>

GitHub Actions 会在 push 和 pull request 时执行 `npm ci` 与 `npm run build`。Cloudflare 的 Git 集成会在 `main` 推送后自动构建并部署。

国内入口使用花生壳/贝锐静态托管，优点是中国大陆直连更友好、不要求访客配置网络代理；缺点是目前不具备与 GitHub 的自动部署链路，需要维护者本地生成 `dist/` 后手动上传，因此可能存在数小时到数天的内容滞后。AI Assistant 已同时支持两个入口，功能使用方式一致。

## 参与协作

### 只贡献课程内容

1. Fork 仓库并创建分支。
2. 只修改 `content/` 下的课程文件。
3. 本地运行 `npm ci` 和 `npm run build`。
4. 确认构建没有内容校验错误。
5. 提交 Pull Request，并说明课程来源、主要变化和图片版权情况。

### 修改平台功能

除上述步骤外，请说明：

- 修改解决了什么问题；
- 是否改变内容格式或目录规则；
- 是否增加新的运行时依赖；
- 对桌面端、移动端、打印和下载的影响；
- 如何回归验证。

交流与缺陷统一放在 [GitHub Issues](https://github.com/Lucifer-cgl/XU/issues)，避免为了评论功能引入后端。

课程投稿、来源声明、默认非商业共享与 Fork 复用的具体约定，见 [开放投稿、版权与复用说明](content/自我介绍/开放投稿、版权与复用说明.md)。

## 边界

- 不提供账号、在线编辑、服务端评论、支付或数据库。
- 不提供服务端 PDF、Word 或 ZIP 生成。
- 不承诺所有浏览器的 PDF 分页完全一致。
- Git 历史仍会保留已提交的大文件，应控制图片体积并避免上传临时文件。
- 公开仓库不应包含密钥、个人隐私或无权分发的资料。

更完整的产品、架构和验收说明见 [知识库平台 PRD](content/自我介绍/知识库平台_PRD.md)。
