import {useState,useEffect,useRef} from 'react';
import {utils,use} from '@common';
import {Tooltip} from 'antd';
const {getTextSize,getPosition}=utils;
const {useEleResize}=use;

const style={
  overflow:'hidden',
  textOverflow:'ellipsis',
  whiteSpace:'nowrap',
  display:'inline-block',
  width:'100%',
};

const Index=({children,ttProps})=>{
  const span=useRef();
  const [ellipsis,setEllipsis]=useState(false);
  const state=useEleResize(span,250);
  useEffect(()=>{
    if(span.current){
      const {width:tWidth}=getTextSize(children);
      const {width}=getPosition(span.current);
      const isEllipsis=tWidth>width;
      if(isEllipsis!==ellipsis){
        setEllipsis(isEllipsis);
      }
    }
  },[children,state.width]);
  return <span ref={span} style={style}>
    {ellipsis?<Tooltip placement="topLeft" title={children} {...ttProps}>{children}</Tooltip>:<span>{children}</span>}
  </span>;
};

export default Index;

