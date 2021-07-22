import {useEffect,useState} from 'react';

const Index=store=>{
  const [collapsed,setCollapsed]=useState(store.getState('huxy-collapsed'));
  useEffect(()=>{
    store.subscribe('huxy-collapsed',result=>setCollapsed(result));
  },[]);
  
  return [collapsed,setCollapsed];
};

export default Index;


