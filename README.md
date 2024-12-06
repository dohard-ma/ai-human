# AI 人类图

## 项目结构

- `types` 类型定义
- `src` 源码
- `dist` 打包输出

## 项目依赖

- `typescript` 4.9.5
- `next` 14.2.7
- `react` 18.3.1
- `tailwindcss` 3.4.11
- `shadcn` 2.1.6
  - pnpm dlx shadcn@latest add button

## 项目运行

```bash
pnpm install
pnpm run dev
```

## 项目打包

```bash
pnpm run build
```

## 核心功能

- 解析人类图，生成固定的数据结构
- 调用 openai 的 api 生成人类图的解读
