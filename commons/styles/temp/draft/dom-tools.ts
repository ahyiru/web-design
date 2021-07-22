import {$clone,uuidv4,debounce} from './yiru-tools';

import $resize from './$resize';

//判断是否含有class
export const hasClass=(target,cname)=>{
  return target.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)'));
  /*let cn=target.getAttribute('class');
  if(!cn){
    return false;
  }
  return cn.match(new RegExp('(\\s|^)'+cname+'(\\s|$)'));*/
};
//添加class
export const addClass=(target,cname)=>{
  let nameArr=cname.split(' ');
  nameArr.map((v,k)=>{
    if(!!v&&!hasClass(target,v)){
      /*let cn=target.getAttribute('class')||'';
      cn?cn+=' '+v:cn+=v;
      target.setAttribute('class',cn);*/
      target.className?target.className+=' '+v:target.className+=''+v;
    }
  });
};
//删除class
export const removeClass=(target,cname)=>{
  let nameArr=cname.split(' ');
  nameArr.map((v,k)=>{
    if(!!v&&hasClass(target,v)){
      // let reg=new RegExp('(\\s|^)'+v+'(\\s|$)');
      let reg=new RegExp('(\\s|^)'+v);
      // target.setAttribute('class',target.getAttribute('class').replace(reg,''));
      target.className=target.className.replace(reg,'');
    }
  });
};
//切换class
export const toggleClass=(target,cname)=>{
  if(hasClass(target,cname)){
    removeClass(target,cname);
  }else{
    addClass(target,cname);
  }
};
//find child
export const findChild=(target,cname)=>{
  let child=[];
  let children=target.children;
  for(let i=0,l=children.length;i<l;i++){
    if(children[i].className.indexOf(cname)>-1){
      child.push(children[i]);
    }
  }
  if(child.length===0){
    return null;
  }
  if(child.length===1){
    return child[0];
  }
  return child;
};

export const findParent=(ele,tag)=>{
  if(ele.tagName===tag||hasClass(ele,tag)){
    return ele;
  }
  const parent=ele.parentNode;
  if(parent){
    return findParent(parent,tag);
  }
  return null;
};
export const findIndex=(ele)=>{
  const parent=ele.parentNode;
  const items=Array.prototype.slice.call(parent.childNodes);//children,nodeType,nodeValue
  const index=items.indexOf(ele);
  return index;
};

export const insertAfter=(newEle,curEle)=>{
  if(!isEle(newEle)||!isEle(curEle)){
    return false;
  }
  let parent=curEle.parentNode;
  if(parent.lastChild===curEle){
    parent.appendChild(newEle);
  }else{
    parent.insertBefore(newEle,curEle.nextSibling);
  }
};
export const append=(pNode,htmlStr)=>{
  pNode.innerHTML+=htmlStr;
};

export const str2Dom=(str)=>{
  const newDom=document.createElement('div');
  newDom.innerHTML=str;
  return newDom.children[0];//newDom.firstChild
};
export const createElement=str=>{
  const el=document.createElement('div');
  el.innerHTML=str;
  return el.childNodes;
};
export const sanitize=(html)=>{
  const doc=document.createElement('div');
  doc.innerHTML=html;
  return doc.innerHTML;
};
/*
function createMarkup() {
  return {__html: 'First &middot; Second'};
}
function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}

// 方法1：document.createElement
const title = document.createElement('h1');
title.innerText='Hello React (method 1)';
title.className='main';
document.getElementById('root').appendChild(title);
// 方法2：React.createElement
import React from 'react';
import ReactDOM from 'react-dom';
const title = React.createElement("h1", {className: "main"}, "Hello React (method 2)");
ReactDOM.render(title, document.getElementById('root'));


React.createElement(
  type,
  [props],
  [...children]
)

var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

function createElement(type, config, children) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
*/
export const dom2Obj=(ele)=>{
  const eleObj={};
  for(let item in ele){
    eleObj[item]=ele[item];
  }
  return eleObj;
};

export const HTMLEncode=(html)=>{
  let temp=document.createElement('div');
  (temp.textContent!=null)?(temp.textContent=html):(temp.innerText=html);
  const output=temp.innerHTML;
  temp=null;
  return output;
};

export const HTMLDecode=(text)=>{
  let temp=document.createElement('div');
  temp.innerHTML=text;
  const output=temp.innerText||temp.textContent;
  temp=null;
  return output;
};


//动画 requestAnimationFrame
export const raf={
  start:(func)=>{
    let win:any=window;
    let begin=win.requestAnimationFrame ||
      win.webkitRequestAnimationFrame   ||
      win.mozRequestAnimationFrame      ||
      function callbackRAF(callback){
        return win.setTimeout(callback,1000/60);
      };
    return begin(func);
  },
  cancel:(id)=>{
    let win:any=window;
    let end=win.cancelAnimationFrame ||
      win.webkitCancelAnimationFrame ||
      win.mozCancelAnimationFrame    ||
      win.clearTimeout;
    return end(id);
  },
};
export const ric={
  start:(cb)=>{
    const requestIdle=(<any>window).requestIdleCallback ||
      function (cb){
        const start=Date.now();
        return setTimeout(function(){
          cb({
            didTimeout:false,
            timeRemaining:function (){
              return Math.max(0,50 - (Date.now() - start));
            },
          });
        },1);
      };
    return requestIdle(cb);
  },
  cancel:(id)=>{
    const cancelIdle=(<any>window).cancelIdleCallback ||
      function (id){
        clearTimeout(id);
      };
    return cancelIdle(id);
  },
};

//返回顶部
export const createToTopBar=(ele=document.body)=>{
  let totopbar=ele.getElementsByClassName('y-back-top')[0];
  // let totopbar=findChild(ele,'y-back-top');
  if(!totopbar){
    totopbar=document.createElement('div');
    totopbar.setAttribute('class','y-back-top');
    let i=document.createElement('i');
    i.setAttribute('class','fa fa-angle-up');
    let span=document.createElement('span');
    span.innerText='返回顶部';
    totopbar.appendChild(i);
    totopbar.appendChild(span);
    ele.appendChild(totopbar);
  }
  totopbar.addEventListener('click',backToTop,false);
  return totopbar;
};
export const removeToTopBar=(ele=document.body)=>{
  let totopbar=ele.getElementsByClassName('y-back-top')[0];
  if(totopbar){
    ele.removeChild(totopbar);
  }
};
//返回顶部
const backToTop=()=>{
  let ele=document.documentElement.scrollTop?document.documentElement:document.body;
  /*let timer=setInterval(()=>{
    if(ele.scrollTop<=0){
      ele.scrollTop=0;
      clearInterval(timer);
      return true;
    }
    ele.scrollTop-=pix;
  },time);*/
  let name=null;
  const step=()=>{
    if(ele.scrollTop<=0){
      ele.scrollTop=0;
      raf.cancel(name);
      return true;
    }
    ele.scrollTop-=100;
    name=raf.start(step);
  };
  step();
};

const scroll=(totopbar)=>{
  const st=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
  const h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
  if(st>h){
    totopbar.style.display='block';
  }else{
    totopbar.style.display='none';
  }
};

export const createScroll:any=()=>{
  const totopbar=createToTopBar();
  window.addEventListener('scroll',debounce(scroll.bind(this,totopbar)),false);
};
createScroll.distroy=()=>{
  removeToTopBar();
  window.removeEventListener('scroll',scroll,false);
};

export const jsFixSize=(ele,w,h=1)=>{
  /*
    css处理方式：width:100%;height:(h/w*100)vw;
   */
  const a=w/h;
  let cw=ele.clientWidth;
  ele.style.height=cw/a+'px';
  $resize.resize(ele,()=>{
    cw=ele.clientWidth;
    ele.style.height=cw/a+'px';
  });
};

/*//获取当前页面--menu
export const getCurrent=(sidebarMenu,str)=>{
  const menu=$clone(sidebarMenu);
  if(str){
    str=str[0];
    menu.map((v,k)=>{
      if(v.subMenu&&v.subMenu.length>0){
        let flag=false,ls=v.subMenu.length;
        v.subMenu.map((sv,sk)=>{
          sv.url='#'+sv.url;
          if(sv.url==str){
            flag=true;
            sv.selected='active';
          }else{
            sv.selected='';
            // let a=str.split('/');
            // let url='/'+a[a.length-2];
            let isSub=str.split('/').length-sv.url.split('/').length==1;
            if(str.indexOf(sv.url)>-1&&!flag&&isSub){
              sv.selected='active';
              flag=true;
            }
          }
        });
        flag?(
          v.selMenu='active',
          v.open='open',
          v.toggleSlide={
            height:ls*36+16
          }
        ):(
          v.selMenu='',
          v.open='',
          v.toggleSlide={
            height:0
          }
        );
      }else{
        v.url='#'+v.url;
        // console.log(str);
        if(v.url==str){
          v.selMenu='active';
        }else{
          v.selMenu='';
          !!v.subMenu&&v.subMenu.map((sv,sk)=>{
            sv.selected='';
          });
        }
      }
    });
  }
  return menu;
};
//获取当前页面--breadcrumb
export const getBreadcrumb=(sidebarMenu,str)=>{
  const menu=$clone(sidebarMenu);
  str=str?str[1]:'/';
  let data=[],tmp=[],f=false;
  const getTitle=(menu,str)=>{
    // let ff=false;
    menu.map((v,k)=>{
      if(f) return false;
      v.url=='/'&&(v.url='#/');
      let hasSub=v.subMenu&&v.subMenu.length>0;
      // let isSub=v.rul===str.split('/').slice(0,-1).join('/');
      let matchRoute=str.split('/').length===v.url.split('/').length;
      let isSub=matchRoute&&str.indexOf(v.url.split('/:')[0]+'/')===0;
      let isMatch=str===v.url||isSub;
      // let isMatch=str.indexOf(v.url)>-1;
      // let isMatch=str.indexOf(v.url)===0;
      if(hasSub){
        tmp.push({title:v.title,url:v.url});
        // ff=true;
        getTitle(v.subMenu,str);
      }else{
        if(isMatch){
          // let isSub=str.split('/').length-v.url.split('/').length==1;
          tmp.push({title:v.title,url:'#'+v.url});
          if(isSub){
            tmp.push({title:str.split('/')[str.split('/').length-1],url:str,cpage:true});
          }
          f=true;
          data=tmp.slice();
        }else{
          // tmp=[];
        }
      }
    });
    tmp.pop();
    return data;
  };
  return getTitle(menu,str);
};*/

// 全屏fullscreen
export const fullScreen=(element)=>{
  let document:any=window.document;
  if(!document.fullscreenElement&&!document.msFullscreenElement&&!document.mozFullScreenElement&&!document.webkitFullscreenElement){
    if(element.requestFullscreen){
      element.requestFullscreen();
    }else if(element.msRequestFullscreen){
      element.msRequestFullscreen();
    }else if(element.mozRequestFullScreen){
      element.mozRequestFullScreen();
    }else if(element.webkitRequestFullscreen){
      element.webkitRequestFullscreen();
    }
  }else{
    if(document.exitFullscreen){
      document.exitFullscreen();
    }else if(document.msExitFullscreen){
      document.msExitFullscreen();
    }else if(document.mozCancelFullScreen){
      document.mozCancelFullScreen();
    }else if(document.webkitExitFullscreen){
      document.webkitExitFullscreen();
    }
  }
};
export const screenWatch:any=(func)=>{
  document.addEventListener('webkitfullscreenchange',func,false);
  document.addEventListener('fullscreenchange',func,false);
  document.addEventListener('mozfullscreenchange',func,false);
  document.addEventListener('msfullscreenchange',func,false);
};
screenWatch.distroy=(func)=>{
  document.removeEventListener('webkitfullscreenchange',func,false);
  document.removeEventListener('fullscreenchange',func,false);
  document.removeEventListener('mozfullscreenchange',func,false);
  document.removeEventListener('msfullscreenchange',func,false);
};
/*export const fs={
  ele:null,
  init:(ele)=>{
    fs.ele=ele;
    document.addEventListener('webkitfullscreenchange',fs.fsc,false);
    document.addEventListener('fullscreenchange',fs.fsc,false);
    document.addEventListener('mozfullscreenchange',fs.fsc,false);
    document.addEventListener('msfullscreenchange',fs.fsc,false);
  },
  distroy:()=>{
    document.removeEventListener('webkitfullscreenchange',fs.fsc,false);
    document.removeEventListener('fullscreenchange',fs.fsc,false);
    document.removeEventListener('mozfullscreenchange',fs.fsc,false);
    document.removeEventListener('msfullscreenchange',fs.fsc,false);
  },
  fsc:()=>{
    let document:any=window.document;
    let element=fs.ele;
    if(!document.fullscreenElement&&!document.msFullscreenElement&&!document.mozFullScreenElement&&!document.webkitFullscreenElement){
      if(element.requestFullscreen){
        element.requestFullscreen();
      }else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
      }else if(element.mozRequestFullScreen){
        element.mozRequestFullScreen();
      }else if(element.webkitRequestFullscreen){
        element.webkitRequestFullscreen();
      }
    }else{
      if(document.exitFullscreen){
        document.exitFullscreen();
      }else if(document.msExitFullscreen){
        document.msExitFullscreen();
      }else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
      }else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
      }
    }
  },
};*/
// 用法:
// let ele=document.getElementsByClassName('fs')[0];
// fs(ele);

export const isEle=(ele)=>{
  if(typeof HTMLElement==='object'){
    return ele instanceof HTMLElement;
  }
  return ele&&typeof ele==='object'&&ele.nodeType===1&&typeof ele.nodeName==='string';
};

// loading
export const oldLoading=(ele=document.body)=>{//HTMLBodyElement,HTMLDivElement,HTMLElement
  let cls='y-loader abs';
  if(ele===document.body){
    cls='y-loader';
  }
  // const overflow=window.getComputedStyle(ele).overflow;
  // let isEle=ele.constructor===HTMLBodyElement||ele.constructor===HTMLDivElement||ele.constructor===HTMLElement;
  // let isEle=ele instanceof Element;
  // let isEle=ele instanceof HTMLElement;
  // let isEle=ele&&typeof ele==='object'&&ele.nodeType===1&&typeof ele.nodeName==='string';
  if(isEle(ele)){
    let loadDiv=ele.getElementsByClassName('y-loader');
    let hasLoad=loadDiv[loadDiv.length-1];
    if(!hasLoad){
      let div=document.createElement('div');
      let figure=document.createElement('figure');
      // obj.setAttribute('style','display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;opacity:0;');
      div.setAttribute('class',cls);
      figure.setAttribute('class','y-loading');
      div.appendChild(figure);

      ele.appendChild(div);
      ele.style.overflow='hidden';
    }else{
      ele.removeChild(hasLoad);
      ele.style.overflow='';
    }
  }
};
export const loading:any=(ele=document.body,fixed=false)=>{
  if(!ele){
    return false;
  }
  /*let cls='y-loader';
  if(ele===document.body){
    cls='y-loader fixed';
  }*/
  let isEle=ele.nodeType===1;
  if(isEle){
    let loadDiv=ele.getElementsByClassName('y-loader')[0];
    if(!loadDiv){
      let div=document.createElement('div');
      let figure=document.createElement('figure');
      if(fixed){
        div.setAttribute('class','y-loader fixed');
      }else{
        div.setAttribute('class','y-loader');
      }
      figure.setAttribute('class','y-loading');
      div.appendChild(figure);
      ele.appendChild(div);
      ele.style.overflow='hidden';
    }/*else{
      ele.removeChild(loadDiv);
      ele.style.overflow='';
    }*/
  }
};
loading.distroy=(ele=document.body)=>{
  if(!ele){
    return false;
  }
  let isEle=ele.nodeType===1;
  if(isEle){
    let loadDiv=ele.getElementsByClassName('y-loader')[0];
    if(loadDiv){
      ele.removeChild(loadDiv);
      ele.style.overflow='';
    }
  }
};

//消息提示 notify
export const oldNotify={
  id:[],
  start:(opt:any={})=>{
    opt.pos=opt.pos||'top-middle';
    opt.color=opt.color||'success';
    opt.icon=opt.icon||'check-square-o';
    opt.txt=opt.txt||'test';

    let notifys=document.getElementsByClassName('y-notification');
    // let ids=new Date().getTime();
    // let ids=window.performance.now();
    let ids=uuidv4();
    oldNotify.id.push(ids);
    opt.id=opt.id||ids;
    opt.id=`noty-${opt.id}`;

    let body=document.body;
    let notify=document.createElement('div');
    let cls=`y-notification ${opt.pos} ${opt.color} ${opt.id}`;
    notify.className=cls;

    let i=document.createElement('i');
    i.className=`fa fa-${opt.icon}`;

    let close=document.createElement('i');
    close.className=`fa fa-times close`;
    close.addEventListener('click',(e)=>{
      let c:any=e.target||e.srcElement;
      let n=c.parentNode;
      n.parentNode.removeChild(n);
    },false);

    let span=document.createElement('span');
    span.innerText=opt.txt;

    notify.appendChild(i);
    notify.appendChild(span);
    notify.appendChild(close);

    body.appendChild(notify);

  },
  destroy:(id=undefined)=>{
    // let noties=document.getElementsByClassName('y-notification');
    if(id===undefined){
      id=oldNotify.id[0];
      oldNotify.id.splice(0,1);
    }
    let cls=`noty-${id}`;
    let notify=document.getElementsByClassName(cls)[0];
    notify&&notify.parentNode.removeChild(notify);
  },
};
export const $notify={
  updateNode:function(pos){
    setTimeout(()=>{
      let node:any=document.getElementsByClassName(pos);
      let p='top';
      if(pos.indexOf('top')===-1){
        p='bottom';
      }
      for(let i=0,j=node.length;i<j;i++){
        node[i].style[p]=i*52+8+'px';
      }
    },200);
  },
  start:function(opt:any={},closeable=false,timer=3000){
    if(opt.pos!=='top-middle'&&opt.pos!=='top-right'&&opt.pos!=='top-left'&&opt.pos!=='bottom-right'&&opt.pos!=='bottom-left'){
      opt.pos='top-middle';
    }
    opt.color=opt.color||'success';
    opt.icon=opt.icon||'check-square-o';
    opt.txt=opt.txt||'test';

    let ele=document.body;

    let notify=document.createElement('div');
    let cls=`y-notification ${opt.pos} ${opt.color}`;
    notify.className=cls;
    ele.appendChild(notify);

    let notifys=ele.getElementsByClassName('y-notification');
    // let notifyPos=ele.getElementsByClassName(opt.pos);
    // let posTop=notifyPos.length*52+8+'px';
    // if(opt.pos.indexOf('top')===0){
    //   notify.style.top=posTop;
    // }else{
    //   notify.style.bottom=posTop;
    // }
    this.updateNode(opt.pos);

    let i=document.createElement('i');
    i.className=`fa fa-${opt.icon}`;
    notify.appendChild(i);
    let span=document.createElement('span');
    span.innerText=opt.txt;
    notify.appendChild(span);

    if(closeable){
      let close=document.createElement('i');
      close.className=`fa fa-times close`;
      close.addEventListener('click',(e)=>{
        let c:any=e.target||e.srcElement;
        let n=c.parentNode;
        n.parentNode.removeChild(n);
        this.updateNode(opt.pos);
      },false);
      notify.appendChild(close);
    }else{
      setTimeout(()=>{
        notify.parentNode.removeChild(notify);
        this.updateNode(opt.pos);
      },timer);
    }
  },
};

//格式化文本
export const formatTxt=(str)=>{
  str=str.replace(/</g,'&lt;');
  str=str.replace(/\n/g,'<pclass="txt-line"></p>');
  str=str.replace(/\r/g,'<pclass="txt-line"></p>');
  str=str.replace(/\s/g,'<spanclass="txt-space"></span>');
  str=str.replace(/\t/g,'<spanclass="txt-space"></span>');
  str=str.replace(/pclass/g,'p class');
  str=str.replace(/spanclass/g,'span class');
  return str;
};

//时间显示 timer
export const $timer=(ele=document.body)=>{
  let ft=(date)=>{
    let week=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    let yy=date.getFullYear(),
        mm=date.getMonth()+1,
        ww=week[date.getDay()],
        dd=date.getDate(),
        hh=date.getHours(),
        MM=date.getMinutes(),
        ss=date.getSeconds();
    mm=mm<10?'0'+mm:mm;
    dd=dd<10?'0'+dd:dd;
    hh=hh<10?'0'+hh:hh;
    MM=MM<10?'0'+MM:MM;
    ss=ss<10?'0'+ss:ss;
    return{
      day:yy+'-'+mm+'-'+dd,
      time:yy+'-'+mm+'-'+dd+' '+hh+':'+MM+':'+ss,
      mtime:yy+'年'+mm+'月'+dd+'日 '+ww+' '+hh+':'+MM+':'+ss,
    };
  };
  let hasTimer=document.getElementsByClassName('y-timer').length>0;
  if(!hasTimer){
    let time=document.createElement('article');
    time.className='y-timer';
    ele.appendChild(time);
    let ct=setInterval(()=>{
      time.innerText=ft(new Date()).mtime;
    },1000);
  }
};

/*
var TemplateEngine = function(html, options) {
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}

// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
(function(){
  var cache = {};
   
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
       
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
         
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
         
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
     
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();*/


/*window.requestIdleCallback = window.requestIdleCallback ||
  function (cb) {
    return setTimeout(function () {
      var start = Date.now();
      cb({ 
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  }

window.cancelIdleCallback = window.cancelIdleCallback ||
  function (id) {
    clearTimeout(id);
  } */

















