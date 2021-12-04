import React,{useRef,useEffect} from 'react';
import Portal from './portal';
import useClickAway from '../../use/useClickAway';
import './index.less';

const Sandbox=({isOpen,onClose,mark=true,dragable=false,children,...rest})=>{
  const targetRef=useRef();
  const sandboxRef=useRef();
  useClickAway(targetRef,ev=>{
    const isInSandbox=sandboxRef.current?.contains(ev.target);
    if(isOpen&&isInSandbox&&typeof onClose==='function'){
      onClose();
    }
  });
  return <Portal mountNode={document.body}>
    <div className="sandbox" ref={sandboxRef}>
      {mark&&<div className={`mark-layer${isOpen?'-open':''}`} />}
      <div className={`sandbox-wrap${isOpen?'-open':''}`}>
        <div className="sandbox-target" {...rest} ref={targetRef}>
          {children}
        </div>
      </div>
    </div>
  </Portal>;
};

export default Sandbox;




const Modalbox=({isOpen,onClose,mark=true,dragable=false,children,...rest})=>{
  const targetRef=useRef();
  const sandboxRef=useRef();
  useClickAway(targetRef,ev=>{
    const isInSandbox=sandboxRef.current?.contains(ev.target);
    if(isOpen&&isInSandbox&&typeof onClose==='function'){
      onClose();
    }
  });
  return <Portal mountNode={document.body}>
    <div className="sandbox" ref={sandboxRef}>
      {mark&&<div className={`mark-layer${isOpen?'-open':''}`} />}
      <div className={`sandbox-wrap${isOpen?'-open':''}`}>
        <div className="sandbox-target" {...rest} ref={targetRef}>
          {children}
        </div>
      </div>
    </div>
  </Portal>;
};
const Dropbox=({isOpen,onClose,mark=true,dragable=false,children,...rest})=>{
  const targetRef=useRef();
  const sandboxRef=useRef();
  useClickAway(targetRef,ev=>{
    const isInSandbox=sandboxRef.current?.contains(ev.target);
    if(isOpen&&isInSandbox&&typeof onClose==='function'){
      onClose();
    }
  });
  return <Portal mountNode={document.body}>
    <div className="dropbox" ref={sandboxRef}>
      {mark&&<div className={`mark-layer${isOpen?'-open':''}`} />}
      <div className={`dropbox-wrap${isOpen?'-open':''}`}>
        <div className="dropbox-target" {...rest} ref={targetRef}>
          {children}
        </div>
      </div>
    </div>
  </Portal>;
};
let msgCount=0;
const Msgbox=({isOpen,onClose,children,...rest})=>{
  msgCount++;
  console.log('msgCount:',msgCount);
  const targetRef=useRef();
  const sandboxRef=useRef();
  return <Portal mountNode={document.body}>
    <div className="msgbox" ref={sandboxRef}>
      <div className={`msgbox-wrap${isOpen?'-open':''}`}>
        <div className="msgbox-target" {...rest} ref={targetRef}>
          {children}
        </div>
      </div>
    </div>
  </Portal>;
};

const createStore=()=>({});

const a=createStore();
/* const aa=()=>{
  const b=a;
  return {
    state,
    create,
    remove,
  };
}; */





const modalStyle={
  backgroundColor:'#fff',
  margin:'0 auto',
};
const dropdownStyle={
  backgroundColor:'#fff',
  margin:'0 auto',
};
const notifyStyle={
  backgroundColor:'#fff',
  margin:'0 auto',
};
const messageStyle={
  backgroundColor:'#fff',
  margin:'0 auto',
};


export const Modal=props=><Sandbox {...props} style={{...modalStyle,...props.style}} />;

export const Dropdown=props=><Sandbox {...props} style={{...dropdownStyle,...props.style}} />;

export const Notify=props=><Sandbox {...props} style={{...notifyStyle,...props.style}} />;

export const Message=props=>{
  useEffect(()=>{

  },[]);
  return <Msgbox {...props} style={{...messageStyle,...props.style}} />;
};































