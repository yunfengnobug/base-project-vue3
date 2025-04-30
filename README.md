# 项目介绍

快速搭建一个带有基础配置的 vue3 项目。
npm create vue@latest 【创建时的Node 版本：v22.14.0 ,不做强制版本要求，自行适配即可，仓库源为淘宝源：https://registry.npmmirror.com/】

### 本项目主要做了：

1. 移除了默认的hello world页面和初始文件，新增了少量的reset.css，可自行修改
2. 提供vscode编辑器可用的 vue 文件生成模板，样式默认为scss，可自行修改
3. 修改了部分环境变量的处理逻辑和项目启动命令
4. dayjs的引入，默认为中文语言配置
5. 生产环境自动移除console

# Project Setup

### 安装依赖

```sh
npm install
```

### 项目启动（不同环境）

```sh
npm run dev
npm run prod
```

### 打包构建

```sh
npm run build:dev
npm run build:prod
```

### 打包构建后分析

```sh
npm run report:dev
npm run report:prod
```
