import {debounce} from '../';
const dragable=()=>{
  let target=null;
  let element=null;
  let x=0;
  let y=0;
  const init=ele=>{
    ele.style.cssText='cursor:move;user-select:none;';
    target=ele;
    element=ele.parentNode;
    document.addEventListener('mousedown',mousedown,false);
  };
  const distroy=ele=>{
    element=null;
    target=null;
    document.removeEventListener('mousedown',mousedown,false);
    document.removeEventListener('mouseup',mouseup,false);
    document.removeEventListener('mousemove',mousemove,false);
  };
  const mousedown=event=>{
    // console.log('mousedown');
    let e=event||window.event;
    let ele=e.target||e.srcElement;
    if(e.button===0){
      if(ele.parentNode===target&&ele.tagName==='H4'){
        // e.preventDefault();//阻止默认事件
        // e.stopPropagation();//阻止事件冒泡
        // ele
        // ele=element=ele.parentNode.parentNode;

        x=e.pageX-element.offsetLeft;
        y=e.pageY-element.offsetTop;

        document.addEventListener('mousemove',mousemove,false);
        document.addEventListener('mouseup',mouseup,false);
      }
    }
  };
  const mousemove=debounce(event=>{
    // console.log('mousemove');
    let ev=event||window.event;
    ev.preventDefault();
    let ele=element;
    let _x=ev.pageX-x,
      _y=ev.pageY-y;
    let vw=document.documentElement.clientWidth,
      vh=document.documentElement.clientHeight;
    let w=vw-ele.offsetWidth,
      h=vh-ele.offsetHeight;
    _x=_x<0?0:_x>w?w:_x;
    _y=_y<0?0:_y>h?h:_y;
    // ele.style.left=_x+'px';
    // ele.style.top=_y+'px';
    ele.style.left=_x*100/vw+'%';
    ele.style.top=_y*100/vh+'%';
    // document.addEventListener('mouseup',mouseup,false);
  });
  const mouseup=event=>{
    // console.log('mouseup');
    let ev=event||window.event;
    ev.stopPropagation();
    document.removeEventListener('mousemove',mousemove,false);
  };
  return {
    init,distroy,
  };
};

export default dragable;

