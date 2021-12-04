import {useEffect,useRef} from 'react';
import {createPortal} from 'react-dom';

const Portal=({mountNode=document.body,children})=>{
  const portalRoot=useRef(document.createElement('div'));
  useEffect(()=>{
    mountNode.appendChild(portalRoot.current);
    return ()=>{
      portalRoot.current.remove();
      portalRoot.current=null;
    };
  },[mountNode]);
  return createPortal(children,portalRoot.current);
};

export default Portal;



