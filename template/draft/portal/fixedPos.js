import debounce from './debounce';

const getViewportSize=()=>{
  return {
    width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
    height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,
  };
};
const getPosition=ele=>ele.getBoundingClientRect();
const str2Dom=str=>{
  const newDom=document.createElement('div');
  newDom.innerHTML=str;
  return newDom.children[0];
};
const getElementsSize=ele=>{
  if(typeof ele==='string'){
    ele=str2Dom(ele);
  }
  const shadow=ele.cloneNode(true);
  shadow.setAttribute('style','pointer-events:none;z-index:-1;opacity:0;display:block;');
  ele.parentNode.appendChild(shadow);
  const {width,height}=getPosition(shadow);
  ele.parentNode.removeChild(shadow);
  return {width,height};
};
const setDirectionCls=(tagEle,direction)=>{
  const cls=tagEle.getAttribute('class');
  const reg=/(\s|^)(lb|rb|lt|rt)(\s|$)/;
  if(reg.test(cls)){
    tagEle.setAttribute('class',cls.replace(/lb|rb|lt|rt/,direction));
  }else{
    tagEle.setAttribute('class',`${cls} ${direction}`);
  }
};
export const setPos=(srcEle,tagEle,distroyFn)=>{
  const {left,right,top,bottom,width,height}=getPosition(srcEle);
  const {width:wWidth,height:wHeight}=getViewportSize();
  const {width:tWidth,height:tHeight}=getElementsSize(tagEle);
  if(right<0||bottom<0||left>wWidth||top>wHeight){
    tagEle.style.visibility='hidden';
    // distroyFn&&distroyFn();
    return {};
  }
  tagEle.style.visibility='';
  const style={
    left:left+'px',
    top:(bottom+10)+'px',
    right:'auto',
    bottom:'auto',
  };
  let direction='lb';
  if(left+tWidth>wWidth){
    style.left=(right-tWidth)+'px';
    direction='rb';
  }
  if(bottom+tHeight>wHeight){
    style.top=(top-tHeight-10)+'px';
    direction=direction==='lb'?'lt':'rt';
  }
  Object.keys(style).map(v=>{
    tagEle.style[v]=style[v];
  });
  setDirectionCls(tagEle,direction);
  return {left,right,top,bottom,width,height,style,direction};
};

export const fixedPos=(srcEle,tagEle)=>{
  const dom=document.getElementsByClassName('frame-view')[0];
  const debounceFn=debounce(setPos);
  const listener=()=>debounceFn(srcEle,tagEle,distroyFn);
  dom.addEventListener('scroll',listener,false);
  window.addEventListener('resize',listener,false);
  const distroyFn=()=>{
    dom.removeEventListener('scroll',listener);
    window.removeEventListener('resize',listener);
    const style={
      left:'',
      top:'',
      right:'',
      bottom:'',
    };
    Object.keys(style).map(v=>{
      tagEle.style[v]=style[v];
    });
  };
  return {...setPos(srcEle,tagEle),distroyFn};
};









