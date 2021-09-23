import {useState,useEffect,useRef} from 'react';
import {utils} from '@common';
const {getTextSize,getPosition}=utils;

const styles={
  overflow:'hidden',
  textOverflow:'ellipsis',
  whiteSpace:'nowrap',
  width:'100%',
  display:'inline-block',
};

const Index=({children,position='lb'})=>{
  const span=useRef();
  const [ellipsis,setEllipsis]=useState(false);
  useEffect(()=>{
    const {width}=getTextSize(children);
    const {width:pWidth}=getPosition(span.ref);
    if(width>pWidth){
      setEllipsis(true);
    }
  },[children]);
  const rest=ellipsis?{
    className:`tooltip-${position}`,
    tooltips:children,
    style:styles,
  }:null;
  return <span ref={span} {...rest}>{children}</span>;
};

export default Index;

