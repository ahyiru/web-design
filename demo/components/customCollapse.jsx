import {components,useRoute,use} from '@common';
const {Anico}=components;
const {useWinResize}=use;
const CustomCollapse=props=>{
  const {useStore}=useRoute();
  const {width}=useWinResize();
  const [collapsed,setCollapsed]=useStore('huxy-collapse');
  return width<1024?<a {...props} onClick={e=>setCollapsed(!collapsed)}><Anico type={collapsed?'right':''} /></a>:null;
};

export default CustomCollapse;
