import './demo2.less';

const demo = props => {
  return <div id="demo">
    <div className="demo1">
      <input name="toggle" />
      <label htmlFor="toggle" />
    </div>
    <div className="demo2">
      <a href="http://ihuxy.com/" />
    </div>
    <div className="demo3">
      <ul>
        <li>首页</li>
        <li>商品</li>
        <li>详情</li>
      </ul>
    </div>
    <div className="demo4">
      <div className="progress" style={{'--percent': 14}} />
      <div className="progress" style={{'--percent': 41}} />
      <div className="progress" style={{'--percent': 94}} />
    </div>
    <div className="demo5">
      <button data-tooltip="我是一段提示">按钮</button>
    </div>
    <div className="demo6">
      <ul className="section">
        <li>
          <h1>自我介绍</h1>
          <ul className="subsection">
            <li>
              <h2>111</h2>
            </li>
            <li>
              <h2>222</h2>
            </li>
          </ul>
        </li>
        
        <li>
          <h1>写一段css代码</h1>
        </li>
      </ul>
    </div>
    <div className="demo7">
      <p>加载中</p>
    </div>
    <div className="demo8">
      <div className="no-more">无更多数据</div>
      <div className="or">Or</div>
    </div>
    <div className="demo9">
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>age</th>
            <th>sex</th>
            <th>job</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>name1</td>
            <td>age1</td>
            <td>sex1</td>
            <td>job1</td>
          </tr>
          <tr>
            <td>name2</td>
            <td>age2</td>
            <td>sex2</td>
            <td>job2</td>
          </tr>
          <tr>
            <td>name3</td>
            <td>age3</td>
            <td>sex3</td>
            <td>job3</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="demo10">
      <div className="container">111</div>
    </div>
    <div className="demo11">
      <div>111</div>
    </div>
    <div className="demo12">
      <div>111</div>
    </div>
    <div className="demo13">
      <input name="rate" type="radio" />
      <input name="rate" type="radio" />
      <input name="rate" type="radio" />
      <input name="rate" type="radio" />
      <input name="rate" type="radio" />
    </div>
    <div className="demo14">
      <div className="g-container">
        <div className="g-section">
          <input type="button" />
          <p>:focus-within 是一个CSS 伪类 ，表示一个元素获得焦点，或，该元素的后代元素获得焦点。换句话说，元素自身或者它的某个后代匹配:focus伪类。</p>
        </div>
        <div className="g-section">
          <input type="button" />
          <p>:focus-within 是一个CSS 伪类 ，表示一个元素获得焦点，或，该元素的后代元素获得焦点。换句话说，元素自身或者它的某个后代匹配:focus伪类。</p>
        </div>
        <div className="g-section">
          <input type="button" />
          <p>:focus-within 是一个CSS 伪类 ，表示一个元素获得焦点，或，该元素的后代元素获得焦点。换句话说，元素自身或者它的某个后代匹配:focus伪类。</p>
        </div>
      </div>
    </div>
    <div className="demo15">
      <div className="container">
        <div className="nav-box">
          <button className="nav-A">Tab-A</button>
          <button className="nav-B">Tab-B</button>
          <div className="content-box">
            <div className="content-A">
              content-A
            </div>
            <div className="content-B">
              content-B
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="demo16">
      <div className="g-container">
        <input type="text" placeholder="输入你想查询的内容" className="g_input_search" />
        <button type="button" className="g_button_search">GO</button>
      </div>
    </div>
    <div className="demo17">
      <div className="page">
        <header tabIndex="0">Header</header>
        <div id="nav-container">
          <div className="bg" />
          <div className="button" tabIndex="0">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </div>
          <div id="nav-content" tabIndex="0">
            <ul>
              <li><a href="#0">Home</a></li>
              <li><a href="#0">Services</a></li>
              <li><a href="#0">Blog</a></li>
              <li><a href="#0">About</a></li>
              <li><a href="#0">Contact</a></li>
              <li className="small"><a href="#0">Facebook</a><a href="#0">Instagram</a></li>
            </ul>
          </div>
        </div>

        <main>
          <div className="content">
            <h2>Off-screen navigation using <span>:focus-within</span></h2>
            <p>Adding yet another pure CSS technique to the list of off-screen navigation by "hacking" the :focus-within pseudo-className. Have a look at the code to see how it works.</p>
            <small><strong>NB!</strong> Use a browser that supports :focus-within</small>
          </div>
        </main>
      </div>
    </div>
    <div className="demo18">
      <div className="g-wrap" />
      <div className="g-container">
        <h2>登录</h2>
        <div className="g-username">
          <input name="loginPhoneOrEmail" maxLength="64" placeholder="请输入手机号或邮箱" className="input" />
          <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" className="g-username" />
        </div>

        <div className="g-password">
          <input name="loginPassword" type="password" maxLength="64" placeholder="请输入密码" className="input" />
          <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" className="g-password" />
        </div>

        <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" className="g-normal" />
      </div>
    </div>
    <div className="demo19">
      <ul>
        <li>不可思议的CSS</li>
        <li>导航栏</li>
        <li>光标下划线跟随</li>
        <li>PURE CSS</li>
        <li>Coco</li>
      </ul>
    </div>
    <div className="demo20">
      <div className="container">
        <div id="content1" className="active">列表1内容:123456</div>
        <div id="content2">列表2内容:abcdefgkijkl</div>
      
        <ul className="nav">
          <li className="active"><a href="#content1">列表1</a></li>
          <li><a href="#content2">列表2</a></li>
        </ul>
      
        <div className="wrap" />
      </div>
    </div>
    <div className="demo21">
      <div />
    </div>
    <div className="demo22">
      <div className="bg">
        <div className="point" />
      </div>
    </div>
    <div className="demo23">
      <div className="basis" />
      <div className="wallpaper" />
      <div className="wallpaper2" />
    </div>
    <div className="demo24">
      <div className="container">
        <h1>Blur word Animation</h1>
      </div>
    </div>
    <div className="demo25">
      <div className="container">
        <div className="filter-mix" />
      </div> 
    </div>
    <div className="demo26">
      <div>Hover Me</div>
    </div>
    <div className="demo27">
      <section className="container">
        <input className="nav1" id="nav1" type="radio" name="nav" checked />
        <input className="nav2" id="nav2" type="radio" name="nav" />
        <ul className="navs">
          <li>
            <label htmlFor="li1">标签1</label>
          </li>
          <li>
            <label htmlFor="li2">标签2</label>
          </li>
        </ul>
        <ul className="contents">
          <li>我是内容1</li>
          <li>我是内容2</li>
        </ul>
      </section>
    </div>
    <div className="demo28">
      <section className="container">
        <input type="text" name="tel" placeholder="请输入手机号码" pattern="^1[3456789]\d{9}$" required />
        <input type="text" name="smscode" placeholder="请输入验证码" pattern="\d{4}" required />
        <button type="submit">submit</button>
      </section>
    </div>
    <div className="demo29">
      <p><a href="example.pdf">Download PDF</a></p>
      <p><a href="example.doc">Download Doc</a></p>
    </div>
  </div>;
};

export default demo;
