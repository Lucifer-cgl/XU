# XU 课程知识库

一个以 GitHub 为内容仓库、由 Cloudflare Pages 托管的轻量课程知识库。

## 两条内容通道

1. **Markdown（`.md`）**：浏览器按需读取并转换为 HTML，统一处理 KaTeX 公式、三线表、文章目录、响应式阅读和 A4/PDF。
2. **完整 HTML（`.html` / `.htm`）**：作为作者已经排版完成的独立页面直接发布，不强制套用 Markdown 模板。

两种文件都会自动加入课程目录和静态搜索索引。

## 层级结构

```text
XU/
├── content/                 # 唯一的课程内容入口
│   └── 课程名称/
│       ├── course.json      # 课程名称、说明与顺序
│       ├── 01-第一章.md
│       ├── 02-专题页面.html
│       └── assets/          # 当前课程的图片和附件
├── src/                     # 浏览器端阅读器
│   ├── main.js              # 目录、搜索与 Markdown 渲染
│   ├── page.js              # 按需加载 Paged.js 并导出 PDF
│   ├── styles.css           # 阅读主题与三线表
│   └── print.css            # A4 分页规则
├── scripts/
│   └── build-content.mjs    # 校验内容，生成目录和搜索索引
├── public/                  # Cloudflare 静态配置
├── .github/workflows/       # 自动检查与构建
├── index.html               # 网站外壳
└── wrangler.jsonc           # Cloudflare Pages 配置
```

以后新增内容时，只需在 `content/课程名称/` 中添加 Markdown、HTML、图片或子文件夹。不要手动修改首页目录。

## 本地运行

```bash
npm install
npm run dev
```

正式构建：

```bash
npm run build
```

构建结果位于 `dist/`。

## Cloudflare Pages

- 生产分支：`main`
- 构建命令：`npm run build`
- 构建输出目录：`dist`
- 根目录：仓库根目录

Cloudflare Pages 使用 GitHub 集成后，每次推送会自动构建；其他分支和拉取请求可生成预览部署。
