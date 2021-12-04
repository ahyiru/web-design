import {useEffect} from 'react';
import {useRouter,components,utils} from '@common';
import configs from '@app/configs';
import getTheme from '@app/utils/getTheme';
import getI18n from '@app/utils/getI18n';
import useGetI18ns from '@app/hooks/useGetI18ns';
import getRoutes from '@app/utils/getRoutes';
import setGlobalVar from '@app/utils/setGlobalVar';
// import SkeletonContent from '@app/components/skeletonContent';
const {Spinner}=components;
const {storage,clone}=utils;

const ConfigProvider=({i18ns,language})=>{
  const {output,loading,store,updateRouter}=useRouter({...configs,routers:getRoutes({i18ns}),title:i18ns.title});
  useEffect(()=>{
    const {setState,subscribe}=store;
    setState({i18ns,'huxy-theme':getTheme(i18ns),'huxy-language':language});
    const cancelLang=subscribe('huxy-language',async lang=>{
      storage.set('language',lang);
      const {i18ns}=await getI18n();
      setState({i18ns,'huxy-theme':getTheme(i18ns)});
      updateRouter({routers:clone(getRoutes({i18ns})),title:i18ns.title});
    });
    const cancelTheme=subscribe('huxy-theme',theme=>setGlobalVar(theme));
    return ()=>{
      cancelLang();
      cancelTheme();
    };
  },[]);
  return <>
    {output}
    {loading&&<Spinner global />}
  </>;
};

const App=()=>{
  const [i18ns]=useGetI18ns();
  if(!i18ns){
    return <Spinner global />;
  }
  return <ConfigProvider {...i18ns} />;
};

export default App;

