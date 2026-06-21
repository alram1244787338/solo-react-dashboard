# 数据仪表盘 (Dashboard)

基于 React 18 + Webpack 5 的纯前端数据仪表盘，多路由页面、原生 Canvas 图表、数据表格、主题设置。无第三方 UI 库、无图表库，纯手写。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认端口 3001）
npm start

# 生产构建
npm run build
```

启动后浏览器访问 <http://localhost:3001>。

## 功能

### 概览页
- **4 张指标卡片**：总用户数、活跃用户、今日收入、订单数
  - 数字 + 标题 + 图标 + 环比变化百分比
  - 环比正数显示 `+12.5%`（绿色 ↑），负数显示 `-3.8%`（红色 ↓）
  - CSS Grid 四列布局，响应式：≤1200px 变 2 列，≤600px 变单列居中（max-width: 360px）
- **Canvas 柱状图**：近 7 天访问量趋势
  - 原生 Canvas 2D，渐变填充柱体、圆角、网格线、柱顶数值、X 轴标签
  - devicePixelRatio 高清适配，窗口 resize 200ms 防抖自动重绘

### 表格页
- 12 条员工 mock 数据（姓名 / 部门 / 状态 / 入职日期）
- 表头固定，隔行变色（斑马纹），hover 浅蓝高亮
- 状态徽章：在职（绿）/ 离职（红）/ 休假（橙），颜色完全通过 CSS 变量映射

### 设置页
- **显示名称**：文本输入框，可编辑
- **主题偏好**：下拉选择（浅色模式 / 深色模式 / 跟随系统），目前为占位
- **保存设置 / 恢复默认**：双按钮，保存后显示成功提示
- 状态仅存组件内存，刷新不持久化（演示用）

### 全局
- **侧边栏导航**：深色侧边栏 + 图标 + 文字，当前路由高亮
- **顶部面包屑**：从路由配置自动生成，形如 `首页 / 概览`
- **路由懒加载**：三个页面各自独立 chunk，Suspense 加载动画

## 技术栈

| 类别 | 技术 | 说明 |
|---|---|---|
| 框架 | React 18 | Hooks、StrictMode、automatic JSX runtime |
| 路由 | React Router 6 | `BrowserRouter` + `lazy()` + `Suspense` |
| 构建 | Webpack 5 | 代码分割（splitChunks）、HMR 热更新 |
| 编译 | Babel 7 | `@babel/preset-env` + `@babel/preset-react` |
| 样式 | CSS Modules | `.module.css` 自动启用，开发可读类名，生产 hash 化 |
| 图表 | 原生 Canvas 2D | 无第三方图表库，封装为 `useChart` hook |
| 测试 | Vitest | 31 个纯逻辑用例，0 UI 渲染 |
| 数据 | Mock | 纯前端，数据集中存放于 `src/data/` |

## 目录结构

```
.
├── __tests__/                  # 测试文件（4 个测试套件）
│   ├── routes.test.js          # 路由配置 + 面包屑生成
│   ├── format.test.js          # MetricCard 数值格式化
│   ├── statusColorMap.test.js  # 状态徽章颜色映射
│   └── settingsForm.test.js    # 设置页表单状态管理
├── public/
│   └── index.html              # HTML 模板
├── src/
│   ├── components/
│   │   ├── BarChart/           # 柱状图组件（封装 useChart）
│   │   ├── DataTable/          # 数据表格组件（隔行变色 + 徽章）
│   │   ├── Header/             # 顶部栏 + 面包屑
│   │   ├── Layout/             # Dashboard 布局容器
│   │   ├── MetricCard/         # 指标卡片
│   │   └── Sidebar/            # 侧边栏导航
│   ├── config/
│   │   └── routes.js           # 路由配置（Sidebar + 面包屑共用）
│   ├── data/
│   │   ├── metrics.js          # 指标卡片数据 + 柱状图 mock
│   │   └── table.js            # 表格数据 + 状态颜色映射
│   ├── hooks/
│   │   ├── useChart.js         # Canvas 柱状图 hook（DPR 适配 + resize 防抖）
│   │   └── useSettingsForm.js  # 设置页表单状态 hook
│   ├── pages/
│   │   ├── Overview/           # 概览页
│   │   ├── Table/              # 表格页
│   │   ├── Settings/           # 设置页
│   │   └── Page.module.css     # 占位时的通用样式
│   ├── styles/
│   │   └── global.css          # 全局样式变量（颜色、间距、阴影、徽章色等）
│   ├── utils/
│   │   └── format.js           # 纯函数：环比格式化、正负判断
│   ├── App.jsx                 # 路由配置 + 懒加载 + Suspense
│   ├── App.module.css          # Suspense 加载动画样式
│   └── index.js                # 入口
├── babel.config.json           # Babel 配置
├── package.json
└── webpack.config.js           # Webpack 配置（CSS Modules / splitChunks / HMR）
```

## 测试

```bash
# 单次执行
npm test

# watch 模式
npm run test:watch
```

**覆盖范围（31 个用例，0 UI 渲染）：**

| 测试文件 | 覆盖内容 | 用例数 |
|---|---|---|
| `routes.test.js` | `routeConfig` 结构完整性、路径唯一性；`getBreadcrumbByPath` 正常路径 `/table`、根路径 `/`、`/settings`、未知路径、空路径 | 8 |
| `format.test.js` | `formatChange` 正数 `+12.5%`、负数 `-3.8%`、零 `+0%`、整数、负整数、多位小数；`getChangeSign` positive/negative 判断 | 9 |
| `statusColorMap.test.js` | 在职→success、离职→danger、休假→warning、未知状态→undefined | 4 |
| `settingsForm.test.js` | 初始化值、默认值、部分覆盖、不可变性、字段更新、多字段更新、重置流程 | 10 |

## 说明

- **纯前端项目**：无后端，所有数据均为 mock，位于 `src/data/`
- **无第三方 UI 组件库**：所有组件均为原生 React + CSS Modules 手写
- **无第三方图表库**：柱状图完全使用 Canvas 2D API 实现，逻辑封装在 `src/hooks/useChart.js`
- **主题预留**：颜色（含徽章色）已全部定义为 CSS 变量，后续接入暗色模式只需在 `:root` 层面切换变量，无需改动组件
