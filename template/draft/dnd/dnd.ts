import {hasClass,addClass,removeClass,insertAfter} from './dom-tools';
import {debounce} from '../';
//拖拽事件 drag and drop
const dnd={
  /*`blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu`.split(' ').map(function(v,k){
    // let str=str.replace(/\r\n/ig,','); 
  });*/
  // dom:document.getElementsByClassName('ydnd')[0],
  globalTmp:{
    drop:document.getElementsByClassName('ydrop'),
    drag:document.getElementsByClassName('ydrag'),
    //create droparea
    createDroparea:(ele)=>{
      let droparea=document.createElement('div');
      droparea.className='droparea';
      droparea.style.width=ele.offsetWidth+'px';
      droparea.style.height=ele.offsetHeight+'px';
      droparea.style.border='2px dashed #bbb';
      droparea.style.position='relative';
      droparea.style.backgroundColor='#f8f8f8';
      return droparea;
    },
    x:0,
    y:0,
    ele:null,
  },
  // init dnd
  init:function(){
    // let dndDom:any=document.getElementsByClassName('ydnd')[0];
    // let drop:any=document.getElementsByClassName('ydrop');
    // let drag:any=document.getElementsByClassName('ydrag');
    this.globalTmp.x=0;
    this.globalTmp.y=0;
    this.globalTmp.ele=null;
    let drop:any=this.globalTmp.drop,
        drag:any=this.globalTmp.drag;
    if(drop.length<1||drag.length<1){
      return false;
    }
    for(let i=0,l=drag.length;i<l;i++){
      drag[i].style.cursor='move';
    }
    for(let i=0,l=drop.length;i<l;i++){
      drop[i].style.position='relative';
      drop[i].style.width='100%';
      // ydrop[i].style.transition='none';
    }
    document.addEventListener('mousedown',this.mousedown,false);
  },
  //mousemove
  move:debounce(function(event){
    let ev=event||window.event;
    ev.preventDefault();
    // let ele=ev.target||ev.srcElement;
    let ele=this.globalTmp.ele;

    addClass(ele,'ydragging');
    //
    /*ele.parentNode.style.width=ele.offsetWidth+'px';
    ele.parentNode.style.height=ele.offsetHeight+'px';*/
    // remove oldarea
    let oldarea=document.getElementsByClassName('droparea')[0];
    oldarea&&oldarea.parentNode.removeChild(oldarea);
    // create droparea
    let droparea=this.globalTmp.createDroparea(ele);
    insertAfter(droparea,ele);
    //
    ele.style.transition='none';
    ele.style.width=ele.offsetWidth+'px';
    ele.style.height=ele.offsetHeight+'px';
    ele.style.position='absolute';
    ele.style.zIndex='99999';
    //
    let _x=ev.pageX-this.globalTmp.x,
        _y=ev.pageY-this.globalTmp.y;
    // let w=document.body.clientWidth-ele.offsetWidth,
    //     h=document.body.clientHeight-ele.offsetHeight;
    //   _x=_x<0?0:_x>w?w:_x;
    //   _y=_y<0?0:_y>h?h:_y;
    ele.style.left=_x+'px';
    ele.style.top=_y+'px';

    // get pos
    const getPos=(ele)=>{
      let rect=ele.getBoundingClientRect();
      let l=rect.left;
      let t=rect.top;
      let r=rect.right;
      let b=rect.bottom;
      let center=l+rect.width/2;
      let middle=t+rect.height/2;
    };

    // dragarea
    let dragPos=ele.getBoundingClientRect();
    let drag_l=dragPos.left;
    let drag_t=dragPos.top;
    let drag_r=dragPos.right;
    let drag_b=dragPos.bottom;
    let drag_center=drag_l+dragPos.width/2;
    let drag_middle=drag_t+dragPos.height/2;
    //
    // let ydrop:any=document.getElementsByClassName('ydrop');
    let ydrop:any=document.getElementsByClassName('ydnd');
    for(let i=0,l=ydrop.length;i<l;i++){
      //
      if(hasClass(ydrop[i],'ydragging')){continue;}
      // cdrop
      let cdrop=ydrop[i];
      // droparea
      let dropPos=cdrop.getBoundingClientRect();
      let drop_l=dropPos.left;
      let drop_t=dropPos.top;
      let drop_r=dropPos.right;
      let drop_b=dropPos.bottom;
      let drop_center=drop_l+dropPos.width/2;
      let drop_middle=drop_t+dropPos.height/2;
      //
      if((drag_center>drop_l&&drag_center<drop_r&&drag_middle>drop_t&&drag_middle<drop_b)||
         (drop_center>drag_l&&drop_center<drag_r&&drop_middle>drag_t&&drop_middle<drag_b)){
        // remove oldarea
        let oldarea=document.getElementsByClassName('droparea')[0];
        let oldarea_l=0,oldarea_t=0;
        if(oldarea){
          const oldareaPos=oldarea.getBoundingClientRect();
          oldarea_l=oldareaPos.left;
          oldarea_t=oldareaPos.top;
          oldarea.parentNode.removeChild(oldarea);
        }
        // create droparea
        // if(drag_center>drop_center||drag_middle>drop_middle){
        if(oldarea_t>drop_t){
          cdrop.parentNode.insertBefore(droparea,cdrop);
        }else{
          insertAfter(droparea,cdrop);
        }
        //
        break;
      }else{
        //
      }
    }
    //
    // document.addEventListener('mouseup',this.mouseup,false);
  }),
  //mouseup
  mouseup:function(event){
    let e=event||window.event;
    // let ele=e.target||e.srcElement;
    let ele=this.globalTmp.ele;
    // document.removeEventListener('mousedown',mousedown,false);
    document.removeEventListener('mousemove',this.move,false);
    // console.log(ele.attributes);
    //
    let droparea:any=document.getElementsByClassName('droparea')[0];
    if(droparea){
      //
      removeClass(ele,'ydragging');
      //
      ele.style.transition='all .3s ease-in-out';// 放在定位top,left上面 y??
      ele.style.top=droparea.offsetTop+'px';
      ele.style.left=droparea.offsetLeft+'px';
      //
      setTimeout(function(){
        ele.style.position='relative';
        ele.style.left=0;
        ele.style.top=0;
        ele.style.width='100%';
        ele.style.zIndex='auto';
        //
        let newNode=ele.cloneNode(true);
        droparea.parentNode.replaceChild(newNode,droparea);
        //
        ele.parentNode.removeChild(ele);
      },308);
    }
    else{
      //
    }
    //
  },
  //mousedown
  mousedown:function(event){
    let e=event||window.event;
    let ele=e.target||e.srcElement;
    // ele=ele.parentNode;
    if(e.button==0){//阻止右键点击 or e.which==1;
      // if(hasClass(ele,'ydrag')){
      if(hasClass(ele.parentNode,'ydrag')&&hasClass(ele,'ydrag-title')/*ele.tagName==='H4'*/){
        // e.preventDefault();//阻止默认事件
        // e.stopPropagation();//阻止事件冒泡
        // ele
        // ele=this.globalTmp.ele=ele.parentNode;
        ele=this.globalTmp.ele=ele.parentNode.parentNode;
        // 数据缓存
        // let dropData;
        //
        this.globalTmp.x=e.pageX-ele.offsetLeft;
        this.globalTmp.y=e.pageY-ele.offsetTop;

        document.addEventListener('mousemove',this.move,false);
        document.addEventListener('mouseup',this.mouseup,false);
      }
    }
    // document.addEventListener('mouseup',this.mouseup,false);
  },
  // distroy mouse event
  distroy:function(){
    document.removeEventListener('mousedown',this.mousedown,false);
    document.removeEventListener('mouseup',this.mouseup,false);
    document.removeEventListener('mousemove',this.move,false);
  },
};
export default dnd;

