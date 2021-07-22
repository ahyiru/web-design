### css

#### tooltip

	<div class="container">
	    <div class="top">
	      <button tooltip="上左上左上左上左上左上左上左">上左</button>
	      <button tooltip="上边上边上边上边上边上边上边上边上边" placement="top">上边</button>
	      <button tooltip="上右上右上右上右上右上右上右上右上右上右" placement="top-right">上右</button>
	    </div>
	    <div class="left">
	      <button tooltip="左上左上左上左上左上左上左上左上左上左上" placement="left-top">左上</button>
	      <button tooltip="左边" placement="left" effect="light">左边</button>
	      <button tooltip="左右" placement="left-bottom">左下</button>
	    </div>
	    <div class="right">
	      <button tooltip="右上右上右上右上右上右上右上右上" placement="right-top">右上</button>
	      <button tooltip="右边" placement="right" effect="light">右边</button>
	      <button tooltip="右下" placement="right-bottom">右下</button>
	    </div>
	    <div class="bottom">
	      <button tooltip="下左" placement="bottom-left">下左</button>
	      <button tooltip="下边" placement="bottom" effect="light">下边</button>
	      <button tooltip="下右下右下右下右下右下右下右下右下右" placement="bottom-right">下右</button>
	    </div>
	  </div>
	
	/* 基本样式 */
	body,
	html {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  padding: 0;
	  margin: 0;
	  height: 100vh;
	}
	
	button {
	  display: inline-block;
	  border: none;
	  padding: 10px 20px;
	  width: 70px;
	  margin-bottom: 10px;
	  cursor: pointer;
	  background-color: #fff;
	  border: 1px solid #dcdfe6;
	  border-radius: 4px;
	  appearance: none;
	  outline: none;
	}
	
	button:hover {
	  color: #409eff;
	  border-color: #c6e2ff;
	  background-color: #ecf5ff;
	}
	
	.container {
	  width: 400px;
	  text-align: center;
	}
	
	.container .right {
	  width: 70px;
	  float: right;
	}
	
	.container .left {
	  width: 70px;
	  float: left;
	}
	
	.container .bottom {
	  clear: both;
	}
	
	/* tooltip样式 */
	[tooltip] {
	  position: relative;
	}
	
	[tooltip]::after {
	  display: none;
	  content: attr(tooltip);
	  position: absolute;
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  padding: 8px 15px;
	  max-width: 200px;
	  border-radius: 4px;
	  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.4);
	  z-index: 100;
	}
	
	[tooltip]::before {
	  display: none;
	  content: '';
	  position: absolute;
	  border: 5px solid transparent;
	  border-bottom-width: 0;
	  z-index: 100;
	}
	
	[tooltip]:hover::after {
	  display: block;
	}
	
	[tooltip]:hover::before {
	  display: block;
	}
	
	[tooltip][placement^="top"]::after, [tooltip][placement^="top"]::before {
	  animation: anime-top 300ms ease-out forwards;
	}
	
	[tooltip][placement^="right"]::after, [tooltip][placement^="right"]::before {
	  animation: anime-right 300ms ease-out forwards;
	}
	
	[tooltip][placement^="bottom"]::after, [tooltip][placement^="bottom"]::before {
	  animation: anime-bottom 300ms ease-out forwards;
	}
	
	[tooltip][placement^="left"]::after, [tooltip][placement^="left"]::before {
	  animation: anime-left 300ms ease-out forwards;
	}
	
	/* 气泡主题 */
	.tooltip-theme-dark, [tooltip]::after {
	  color: #fff;
	  background-color: #313131;
	}
	
	.tooltip-theme-light, [tooltip][effect="light"]::after {
	  color: #313131;
	  background-color: #fff;
	  border: 1px solid #313131;
	}
	
	/* 气泡位置 */
	/*----上----*/
	.tooltip-placement-top, [tooltip]:not([placement])::after, [tooltip][placement=""]::after, [tooltip][placement="top"]::after {
	  bottom: calc(100% + 10px);
	  left: 50%;
	  transform: translate(-50%, 0);
	}
	
	.tooltip-placement-top-right, [tooltip][placement="top-right"]::after {
	  bottom: calc(100% + 10px);
	  left: 100%;
	  transform: translate(-100%, 0);
	}
	
	.tooltip-placement-top-left, [tooltip][placement="top-left"]::after {
	  bottom: calc(100% + 10px);
	  left: 0;
	  transform: translate(0, 0);
	}
	
	/*----右----*/
	.tooltip-placement-right, [tooltip][placement="right"]::after {
	  left: calc(100% + 10px);
	  top: 50%;
	  transform: translate(0, -50%);
	}
	
	.tooltip-placement-right-top, [tooltip][placement="right-top"]::after {
	  left: calc(100% + 10px);
	  top: 0;
	  transform: translate(0, 0);
	}
	
	.tooltip-placement-right-bottom, [tooltip][placement="right-bottom"]::after {
	  left: calc(100% + 10px);
	  top: 100%;
	  transform: translate(0, -100%);
	}
	
	/*----下----*/
	.tooltip-placement-bottom, [tooltip][placement="bottom"]::after {
	  top: calc(100% + 10px);
	  left: 50%;
	  transform: translate(-50%, 0);
	}
	
	.tooltip-placement-bottom-right, [tooltip][placement="bottom-right"]::after {
	  top: calc(100% + 10px);
	  left: 100%;
	  transform: translate(-100%, 0);
	}
	
	.tooltip-placement-bottom-left, [tooltip][placement="bottom-left"]::after {
	  top: calc(100% + 10px);
	  left: 0;
	  transform: translate(0, 0);
	}
	
	/*----左----*/
	.tooltip-placement-left, [tooltip][placement="left"]::after {
	  right: calc(100% + 10px);
	  top: 50%;
	  transform: translate(0, -50%);
	}
	
	.tooltip-placement-left-top, [tooltip][placement="left-top"]::after {
	  right: calc(100% + 10px);
	  top: 0;
	  transform: translate(0, 0);
	}
	
	.tooltip-placement-left-bottom, [tooltip][placement="left-bottom"]::after {
	  right: calc(100% + 10px);
	  top: 100%;
	  transform: translate(0, -100%);
	}
	
	/* 三角形主题 */
	.triangle-theme-dark, [tooltip]::before {
	  border-top-color: #313131;
	}
	
	.triangle-theme-light, [tooltip][effect="light"]::before {
	  border-top-color: #313131;
	}
	
	/* 三角形位置 */
	/*----上----*/
	.triangle-placement-top, [tooltip]:not([placement])::before, [tooltip][placement=""]::before, [tooltip][placement="top"]::before {
	  bottom: calc(100% + 5px);
	  left: 50%;
	  transform: translate(-50%, 0);
	}
	
	.triangle-placement-top-left, [tooltip][placement="top-left"]::before {
	  bottom: calc(100% + 5px);
	  left: 10px;
	}
	
	.triangle-placement-top-right, [tooltip][placement="top-right"]::before {
	  bottom: calc(100% + 5px);
	  right: 10px;
	}
	
	/*----右----*/
	.triangle-placement-right, [tooltip][placement="right"]::before, .triangle-placement-right-top, [tooltip][placement="right-top"]::before, .triangle-placement-right-bottom, [tooltip][placement="right-bottom"]::before {
	  left: calc(100% + 3px);
	  top: 50%;
	  transform: translate(0, -50%) rotateZ(90deg);
	}
	
	.triangle-placement-right-top, [tooltip][placement="right-top"]::before {
	  top: 10px;
	}
	
	.triangle-placement-right-bottom, [tooltip][placement="right-bottom"]::before {
	  bottom: 10px;
	  top: auto;
	  transform: translate(0, 0) rotateZ(90deg);
	}
	
	/*----下----*/
	.triangle-placement-bottom, [tooltip][placement="bottom"]::before, .triangle-placement-bottom-left, [tooltip][placement="bottom-left"]::before, .triangle-placement-bottom-right, [tooltip][placement="bottom-right"]::before {
	  top: calc(100% + 5px);
	  left: 50%;
	  transform: translate(-50%, 0) rotateZ(180deg);
	}
	
	.triangle-placement-bottom-left, [tooltip][placement="bottom-left"]::before {
	  transform: translate(0, 0) rotateZ(180deg);
	  left: 10px;
	}
	
	.triangle-placement-bottom-right, [tooltip][placement="bottom-right"]::before {
	  right: 10px;
	  left: auto;
	}
	
	/*----左----*/
	.triangle-placement-left, [tooltip][placement="left"]::before, .triangle-placement-left-top, [tooltip][placement="left-top"]::before, .triangle-placement-left-bottom, [tooltip][placement="left-bottom"]::before {
	  right: calc(100% + 3px);
	  top: 50%;
	  transform: translate(0, -50%) rotateZ(270deg);
	}
	
	.triangle-placement-left-top, [tooltip][placement="left-top"]::before {
	  top: 10px;
	}
	
	.triangle-placement-left-bottom, [tooltip][placement="left-bottom"]::before {
	  bottom: 10px;
	  top: auto;
	  transform: translate(0, 0) rotateZ(270deg);
	}
	
	@keyframes anime-top {
	  from {
	    opacity: .5;
	    bottom: 150%;
	  }
	}
	
	@keyframes anime-bottom {
	  from {
	    opacity: .5;
	    top: 150%;
	  }
	}
	
	@keyframes anime-left {
	  from {
	    opacity: .5;
	    right: 150%;
	  }
	}
	
	@keyframes anime-right {
	  from {
	    opacity: .5;
	    left: 150%;
	  }
	}



#### tab

	<section class="container">
	  <!-- 隐藏的radio（默认选中第一项，id是给label用的） -->
	  <input class="nav1" id="nav1" type="radio" name="nav" checked>
	  <input class="nav2" id="nav2" type="radio" name="nav">
	
	  <!-- 标签列表 -->
	  <ul class="navs">
	    <li>
	      <label for="li1">标签1</label>
	    </li>
	    <li>
	      <label for="li2">标签2</label>
	    </li>
	  </ul>
	
	  <!-- 内容列表 -->
	  <ul class="contents">
	    <li>我是内容1</li>
	    <li>我是内容2</li>
	  </ul>
	</section>
	
	$main: #807af1;
	
	input {
	  display: none;
	}
	
	// 标签列表
	.navs {
	  display: flex;
	  list-style: none;
	
	  li {
	    padding: 10px;
	  }
	}
	
	// 内容列表（默认隐藏，选中的才显示）
	.contents {
	  li {
	    display: none;
	    padding: 10px;
	  }
	}
	
	// 标签选中的样式（大家可以配合类名使用for循环，这里写死两个标签）
	.nav1:checked~.navs li:first-child,
	.nav2:checked~.navs li:last-child {
	  color: $main;
	  border-bottom: 1px solid $main;
	}
	
	// 内容显示样式
	.nav1:checked~.contents li:first-child,
	.nav2:checked~.contents li:last-child {
	  display: block;
	}
	
	// 内容列表
	.contents {
	  li {
	    animation: fade .5s cubic-bezier(0.075, 0.82, 0.165, 1); // 内容切换动画（可选）
	  }
	}
	
	// 内容切换动画（可选）
	@keyframes fade {
	  from {
	    transform: translateX(20px);
	    opacity: 0
	  }
	
	  to {
	    transform: translateX(0);
	    opacity: 1
	  }
	}


#### 表单验证

	<section class="container">
	  <input type="text" name="tel" placeholder="请输入手机号码" pattern="^1[3456789]\d{9}$" required><br>
	  <input type="text" name="smscode" placeholder="请输入验证码" pattern="\d{4}" required><br>
	  <button type="submit"></button>
	</section>
	
	input {
	  // 验证通过时按钮的样式
	  &:valid {
	    &~button {
	      pointer-events: all;
	      cursor: pointer;
	
	      &::after {
	        content: "提交👍"
	      }
	    }
	  }
	
	  // 验证不通过时按钮的样式
	  &:invalid {
	    &~button {
	      pointer-events: none; // 去除点击事件，让按钮无法点击
	
	      &::after {
	        content: "未通过验证😒"
	      }
	    }
	  }
	}




[https://juejin.im/user/587e1822128fe1005706db1c/posts](https://juejin.im/user/587e1822128fe1005706db1c/posts)

[https://juejin.im/user/58247e285bbb5000590e4824](https://juejin.im/user/58247e285bbb5000590e4824)

[https://juejin.im/post/5d57adf5f265da03e3697e1b?utm_source=gold_browser_extension](https://juejin.im/post/5d57adf5f265da03e3697e1b?utm_source=gold_browser_extension)






	<p><a href="example.pdf">Download PDF</a></p>
	<p><a href="example.doc">Download Doc</a></p>
	
	body {
	  font-family: 'Arial';
	  padding: 1rem;
	  max-width: 600px;
	  margin: 2rem auto;
	}
	
	p {
	  margin-bottom: 1.5rem;
	}
	
	a {
	  position: relative;
	  text-decoration: none;
	  color: #000;
	}
	
	a[href$=".pdf"] {
	  &:before {
	    content: "";
	    display: inline-block;
	    vertical-align: middle;
	    margin-right: 8px;
	    width: 18px;
	    height: 18px;
	    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/182774/np_pdf_377198_000000.svg) center/20px no-repeat;
	    padding: 3px;
	    //outline: solid 1px red;
	  }
	}
	
	a[href$=".doc"] {
	  &:before {
	    content: "";
	    display: inline-block;
	    vertical-align: middle;
	    margin-right: 8px;
	    width: 18px;
	    height: 18px;
	    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/182774/np_word_1306442_000000.svg) center/20px no-repeat;
	    padding: 3px;
	    //outline: solid 1px red;
	  }
	}




	<p>Or</p>
	
	p {
	  display: flex;
	  align-items: center;
	}
	
	p:before, p:after {
	  content: "";
	  height: 2px;
	  background: #c5c5c5;
	  flex-grow: 1;
	}
	
	p:before {
	  margin-right: 10px;
	}
	
	p:after {
	  margin-left: 10px;
	}





#### 什么是 BFC

W3C 定义：浮动，绝对定位元素，inline-blocks, table-cells, table-captions,和overflow的值不为visible的元素，（除了这个值已经被传到了视口的时候）将创建一个新的块级格式化上下

#### 产生条件

- float 的值不为 none
- position 的值不为 static 或者 relative
- display 的值为 table-cell, table-caption, inline-block, flex, 或者 inline-flex 中的其中一个
- overflow 的值不为 visible
- display:flow-root: 最安全无副作用的做法 （但是 兼容 头疼）


### 变量

	:root {
		--THEME: var(--USER-THEME-COLOR, #e5473c);
		--THEME-COLOR: var(--USER-THEME-COLOR, #e5473c);
	}

将全局自定义属性设置为 SASS 变量

	$theme-color: var(--THEME);
	$theme-bg: var(--THEME);

JS 修改全局自定义属性

	const elm = document.documentElement
	const colorArr = ['#e5473c', '#31c27c', '#0c8ed9', '#f60']
	elm.style.setProperty('--USER-THEME-COLOR', colorArr[i])
	i = (i + 1) % colorArr.length

#### filter

	filter:blur(2px);








### CSS 实现多行文字截断

	.wrap {
	    height: 40px;
	    line-height: 20px;
	    overflow: hidden;
	}
	
	.wrap .text {
	    float: right;
	    margin-left: -5px;
	    width: 100%;
	    word-break: break-all;
	}
	
	.wrap::before {
	    float: left;
	    width: 5px;
	    content: '';
	    height: 40px;
	}
	
	.wrap::after {
	    float: right;
	    text-align: right;
	    content: "...";
	    height: 20px;
	    line-height: 20px;
	    /* 为三个省略号的宽度 */
	    width: 3em;
	    /* 使盒子不占位置 */
	    margin-left: -3em;
	    /* 移动省略号位置 */
	    position: relative;
	    left: 100%;
	    top: -20px;
	    padding-right: 5px;
	    /* 显示更好的效果 */
	    background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(white), color-stop(50%, white));
	    background: -moz-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
	    background: -o-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
	    background: -ms-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
	    background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
	}

### transition+fixed

如果transformEle使用了transform，而fixedEle使用了position: fixed，那么position: fixed不会有固定在visual viewport上，实际结果相当于相对transformEle元素定位，就是fixed相对的不是visual viewport，而是transformELe, 产生这样的原因主要是因为transform和position: fixed使用了不同的坐标系统

### 盒模型

盒模型由 4 部分组成，从内到外分别是：content padding border margin。

	// W3C 标准盒模型（浏览器默认）
	box-sizing: content-box;
	
	// IE 怪异盒模型
	box-sizing: border-box;

### BFC

BFC（Block Formatting Context）格式化上下文，是Web页面中盒模型布局的CSS渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

#### 形成BFC的条件

	1、浮动元素，float 除 none 以外的值； 
	2、定位元素，position（absolute，fixed）； 
	3、display 为以下其中之一的值 inline-block，table-cell，table-caption； 
	4、overflow 除了 visible 以外的值（hidden，auto，scroll）；

#### BFC的特性

	1.内部的Box会在垂直方向上一个接一个的放置。
	2.垂直方向上的距离由margin决定
	3.bfc的区域不会与float的元素区域重叠。
	4.计算bfc的高度时，浮动元素也参与计算
	5.bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。


### 3D效果

- rotate 旋转
- translate 定义 2D 转换
- translateZ 定义 3D 转换
- perspective 为 3D 转换元素定义透视视图。
- transform-style: preserve-3d; 指定子元素定位在三维空间内。另外，该属性是非继承的。

- perspective是指 从当前视角到所看平面的距离
- translateZ指的是 从所看平面到推进视角之间的距离，大白话就是从当前距离 把你看的拉进或者拉远的距离
- 人的视角在3D投影效果中是 近大远小













### css

#### dark

	.message-dark {
	    filter: invert(100) hue-rotate(180deg);
	}

### css

[css_tricks](https://qishaoxuan.github.io/css_tricks/)

获取元素在可视区域的位置

1. IntersectionObserver
2. getBoundingClientRect





### svg流程图

[有向无环图](https://user-gold-cdn.xitu.io/2018/11/25/1674aa56b435762f)

### css

1. background-blend-mode：用于混合元素背景图案、渐变和颜色
2. mix-blend-mode：用于元素与元素之间的混合
3. isolation：用户阻止某些元素在mix-blend-mode 使用时被混合

#### CSS 渐变和 background-blend-mode 组合

#### 1. 光谱背景

	.spectrum-background {
	    background:
	        linear-gradient(red, transparent),
	        linear-gradient(to top left, lime, transparent),
	        linear-gradient(to top right, blue, transparent);
	    background-blend-mode: screen;
	}

#### 2. 条纹网格背景

	.plaid-background {
	    background:
	        repeating-linear-gradient(
	            -45deg,
	            transparent 0,
	            transparent 25%,
	            dodgerblue 0,
	            dodgerblue 50%
	       ),
	       repeating-linear-gradient(
	            45deg,
	            transparent 0,
	            transparent 25%,
	            tomato 0,
	            tomato 50%
	        ),
	        repeating-linear-gradient(
	            transparent 0,
	            transparent 25%,
	            gold 0,
	            gold 50%
	        ), white;
	    background-blend-mode: multiply;
	    background-size: 100px 100px;
	}

#### 3. 圆圈环绕背景

	.circles-background {
	    background:
	        radial-gradient(
	            khaki 40px,
	            transparent 0,
	            transparent 100%
	        ),
	        radial-gradient(
	            skyblue 40px,
	            transparent 0,
	            transparent 100%
	        ),
	        radial-gradient(
	            pink 40px,
	            transparent 0,
	            transparent 100%
	        ), snow;
	    background-blend-mode: multiply;
	    background-size: 100px 100px;
	    background-position: 0 0, 33px 33px, -33px -33px;
	}

#### 图片效果和 background-blend-mode 组合

#### 混合模式

	.blend {
	    background: #fff;
	}
	.blend img {
	    mix-blend-mode: darken; 
	}

#### 渐变边框

	.box {
	  margin: 80px 30px;
	  width: 200px;
	  height: 200px;
	  position: relative;
	  background: #fff;
	  float: left;
	}
	.box:before {
	      content: '';
	      z-index: -1;
	      position: absolute;
	      width: 220px;
	      height: 220px;
	      top: -10px;
	      left: -10px;
	      background-image: linear-gradient(90deg, yellow, gold);
	}

#### currentColor

#### Object Fit

	.image__contain {
	  object-fit: contain; 
	} 
	.image__fill {
	  object-fit: fill; 
	}
	.image__cover {
	  object-fit: cover; 
	}
	.image__scale-down {
	  object-fit: scale-down;
	}

#### checkbox

	<!-- css -->
	input[type=checkbox] {display: none;}
	
	input[type=checkbox] + label:before {  
	    content: "";
	    border: 1px solid #000;
	    font-size: 11px;    
	    line-height: 10px;
	    margin: 0 5px 0 0;
	    height: 10px;
	    width: 10px;
	    text-align: center;
	    vertical-align: middle;
	}
	
	input[type=checkbox]:checked + label:before {  
	    content: "\2713";
	}

	<!-- checkbox -->
	input[type=checkbox] + label:before {  
	    content: "\2713";
	    color: transparent;
	    transition: color ease .3s;
	}
	input[type=checkbox]:checked + label:before {  
	    color: #000;
	}
	
	<!-- radio -->
	input[type=radio] + label:before {  
	    content: "\26AB";
	    border: 1px solid #000;
	    border-radius: 50%;
	    font-size: 0;    
	    transition: font-size ease .3s;
	}
	input[type=radio]:checked + label:before {  
	    font-size: 10px;    
	}

#### visibility: visible

	.hidden {
	  visibility: hidden;
	}
	.hidden .visible {
	  visibility: visible;
	}

#### vw、vh

- vw (viewport width) - 浏览器窗口宽度的1%。
- vh (viewport height) - 同上，只不过用来描述高度。
- vmin and vmax 设置介于vh和vw之间的最大最小值。

#### 文字修饰

	*::selection {
	    color: #fff;
	    background: #000;
	}
	*::-moz-selection {    
	    /*Only Firefox still needs a prefix*/
	    color: #fff;
	    background: #000;
	}

#### 使用硬件加速

	.block {
	    transform: translateZ(0);
	}

#### Color + Border = Border-Color

	input[type="text"] {  
	    color: red;
	    border: 1px solid;
	}

#### Houdini

















