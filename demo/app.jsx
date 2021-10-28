import {useEffect} from 'react';
import {useRouter,components,utils} from '@common';
import configs from '@app/configs';
import getTheme from '@app/utils/getTheme';
import getI18n from '@app/utils/getI18n';
import useGetApis from '@app/hooks/useGetApis';
import useGetI18ns from '@app/hooks/useGetI18ns';
import useGetProfile from '@app/hooks/useGetProfile';
import {isAuthed} from '@app/utils/utils';
import getRoutes from '@app/utils/getRoutes';
// import SkeletonContent from '@app/components/skeletonContent';
const {Spinner}=components;
const {storage,clone}=utils;

const ConfigProvider=({i18ns,profile,permission,routerList})=>{
  const {output,loading,store,useStore,updateRouter}=useRouter({...configs,routers:getRoutes({profile,i18ns,permission,routerList}),title:i18ns.title});
  const [,,subLang]=useStore('huxy-language');
  useEffect(()=>{
    const {setState}=store;
    setState({permission,profile,i18ns,'huxy-theme':getTheme(i18ns)});
    const off=subLang(async lang=>{
      storage.set('language',lang);
      const {i18ns}=await getI18n();
      setState({i18ns,'huxy-theme':getTheme(i18ns)});
      updateRouter({routers:clone(getRoutes({profile,i18ns,permission,routerList})),title:i18ns.title});
    });
    return ()=>off();
  },[]);
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

const App=()=>{
  const [apis]=useGetApis();
  const [i18ns]=useGetI18ns();
  if(!apis||!i18ns){
    return <Spinner global />;
  }
  return isAuthed()?<AuthedApp {...i18ns} />:<ConfigProvider {...i18ns} />;
};

export default App;

