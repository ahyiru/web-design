import {utils} from '@common';
import initStart from '@app/utils/handleEvts';

const {debounce,getTouchPosition,getRelative,getViewportSize,setStyle,getPosition}=utils;

const defCfg={
  relativeX:0,
  relativeY:0,
};

const dragableStyles={
  position:'fixed',
  zIndex:10001,
  cursor:'move',
  userSelect:'none',
  left:'',
  top:'',
  width:'',
  height:'',
};

const startEvent=(evt,ref)=>{
  const {left,top,width,height}=getPosition(ref);
  setStyle(ref,{...dragableStyles,left:`${left}px`,top:`${top}px`,width:`${width}px`,height:`${height}px`});
  const {x,y}=getRelative(evt,ref);
  defCfg.relativeX=x;
  defCfg.relativeY=y;
};
const moveEvent=/* debounce( */(evt,ref)=>{
  evt.preventDefault();
  const {touchX,touchY}=getTouchPosition(evt);
  let left=touchX-defCfg.relativeX;
  let top=touchY-defCfg.relativeY;
  const {width,height}=getViewportSize();
  const x=width-ref.offsetWidth;
  const y=height-ref.offsetHeight;
  left=left<0?0:left>x?x:left;
  top=top<0?0:top>y?y:top;
  // ref.style.left=`${left}px`;
  // ref.style.top=`${top}px`;
  ref.style.left=`${left*100/width}%`;
  ref.style.top=`${top*100/height}%`;
}/* ) */;
const endEvent=(evt,ref)=>{
  evt.stopPropagation();
  setStyle(ref,dragableStyles,true);
};

const init=ref=>initStart(ref,startEvent,moveEvent,endEvent);

export default init;
