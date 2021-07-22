import {useEffect,useRef,useState} from 'react';

const RenderChild=({item,children})=>{
  const {uuid,open}=item;
  const [maxHeight,setMaxHeight]=useState('');
  const ul=useRef();
  const isInit=useRef(true);
  useEffect(()=>{
    const el=ul.current;
    if(isInit.current){
      const height=open?`${el.scrollHeight}px`:'0px';
      setMaxHeight(height);
      isInit.current=false;
    }else{
      const initH=open?'0px':`${el.scrollHeight}px`;
      setMaxHeight(initH);
      setTimeout(()=>{
        const height=open?`${el.scrollHeight}px`:'0px';
        setMaxHeight(height);
      },5);
    }
  },[open,item.children?.length]);
  useEffect(()=>{
    // 多层级触发
    if(uuid){
      setMaxHeight('');
    }
  },[uuid]);
  return <ul ref={ul} style={{maxHeight}}>{children}</ul>;
};

export default RenderChild;