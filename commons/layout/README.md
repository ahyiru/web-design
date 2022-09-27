## layout

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ahyiru/layout/blob/develop/LICENSE)
[![npm version](https://img.shields.io/npm/v/@huxy/layout.svg)](https://www.npmjs.com/package/@huxy/layout)
[![Build Status](https://api.travis-ci.com/ahyiru/layout.svg?branch=master)](https://app.travis-ci.com/github/ahyiru/layout)
[![](https://img.shields.io/badge/blog-ihuxy-blue.svg)](http://ihuxy.com/)


### 功能

该 `layout` 框架是传统的中后台 `layout` 模板，提供了头部导航栏、菜单栏、底部栏、logo、面包屑等。

- 支持菜单栏展示、隐藏，展开、缩小等配置。
- 支持左侧垂直菜单、顶部水平菜单、水平垂直菜单组合。
- 支持自适应屏幕。根据屏幕大小展开、缩小、隐藏菜单，头部信息展示方式切换。
- 支持 nav 导航栏自定义。自定义导航信息、下拉信息、点击事件等。

### 使用

常用配置：

- menuType: sideMenu | navMenu, 默认 sideMenu。横纵菜单配置。
- MenuBottom：菜单底部内容
- MainTop：主页顶部内容。如：面包屑。
- Footer：页面底部内容。
- headerStyle、asideStyle、menuStyle、contentStyle：样式。
- handleNavClick：导航栏点击事件。
- leftList、rightList：左侧导航栏、右侧导航栏配置。
- logo、title、iconList、Link：logo、标题、图标、Link组件 注入。