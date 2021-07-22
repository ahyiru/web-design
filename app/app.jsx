import {useEffect,useState} from 'react';
import {useRouter,components,utils} from '@common';

import configs from '@app/configs';

import {setTheme} from '@app/configs/defaultConfigs';

// import SkeletonContent from '@app/components/skeletonContent';

import apiList,{getApiFn} from '@app/utils/getApis';
import getI18n from '@app/utils/getI18n';
import useGetProfile from '@app/hooks/useGetProfile';
import {isAuthed} from '@app/utils/utils';
import getRouters from '@app/utils/getRouters';

const {Spinner}=components;
const {storage,clone}=utils;

const ConfigProvider=({i18ns,language,profile,permission,routerList})=>{
  const {output,loading,store,updateRouter}=useRouter({...configs,routers:getRouters({profile,i18ns,permission,routerList}),title:i18ns.title});
  useEffect(()=>{
    let off;
    if(store){
      const {subscribe,setState}=store;
      setState({permission,profile,i18ns,language});
      setTheme(store,i18ns);
      /* subscribe('update-router',result=>{
        updateRouter({routers:result.menu,exact:true});
      }); */
      off=subscribe('huxy-language',async lang=>{
        storage.set('language',lang);
        const {i18ns,language}=await getI18n();
        setState({i18ns,language});
        setTheme(store,i18ns);
        updateRouter({routers:clone(getRouters({profile,i18ns,permission,routerList})),title:i18ns.title});
      });
    }
    return ()=>off?.();
  },[store]);
  return <>
    {output}
    {loading&&<Spinner global />}
  </>;
};

const AuthedApp=props=>{
  const [{profile,permission,routerList}]=useGetProfile();
  if(!permission){
    return <Spinner global />;
  }
  return <ConfigProvider {...props} profile={profile} permission={permission} routerList={routerList} />;
};

const NotAuthedApp=props=><ConfigProvider {...props} />;

const App=()=>{
  const [apis,setApis]=useState(null);
  const [i18ns,setI18ns]=useState(null);
  useEffect(()=>{
    const loadI18n=async ()=>{
      const i18ns=await getI18n();
      setI18ns(i18ns);
    };
    const loadApis=async ()=>{
      const apis=await getApiFn();
      setApis(apis);
    };
    loadI18n();
    loadApis();
  },[]);
  if(!i18ns||!apis){
    return <Spinner global />;
  }
  return isAuthed()?<AuthedApp {...i18ns} />:<NotAuthedApp {...i18ns} />;
};

export default App;


