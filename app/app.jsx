import {useEffect} from 'react';
import {useRouter} from '@huxy/router';
import {Spinner} from '@huxy/components';
import {storage} from '@huxy/utils';
import configs from '@app/configs';
import getTheme from '@app/utils/getTheme';
import getI18n from '@app/utils/getI18n';
import useGetApis from '@app/hooks/useGetApis';
import useGetI18ns from '@app/hooks/useGetI18ns';
import useGetProfile from '@app/hooks/useGetProfile';
import {isAuthed} from '@app/utils/utils';
import getRoutes from '@app/utils/getRoutes';
import setGlobalVar from '@app/utils/setGlobalVar';
// import SkeletonContent from '@app/components/skeletonContent';

const getRouterCfgs = ({profile, permission, routerList, i18ns}) => ({...configs, routers: getRoutes({profile, i18ns, permission, routerList}), title: i18ns.title});

const ConfigProvider = ({i18ns={}, language, profile={}, permission, routerList, routerCfgs}) => {
  const {output, loading, store, updateRouter} = useRouter(routerCfgs);
  useEffect(() => {
    const {setState, subscribe} = store;
    const cancelTheme = subscribe('huxy-theme', setGlobalVar);
    setState({permission, profile, i18ns, 'huxy-theme': getTheme(i18ns), 'huxy-language': language});
    const cancelLang = subscribe('huxy-language', async (lang) => {
      storage.set('language', lang);
      const {i18ns} = await getI18n();
      setState({i18ns, 'huxy-theme': getTheme(i18ns)});
      updateRouter({routers: getRoutes({profile, i18ns, permission, routerList}), title: i18ns.title});
    });
    return () => {
      cancelLang();
      cancelTheme();
    };
  }, []);
  return (
    <>
      {output}
      {loading && <Spinner global />}
    </>
  );
};

const AuthedApp = (props) => {
  const [{profile, permission, routerList}] = useGetProfile();
  if (!profile) {
    return <Spinner global />;
  }
  return <ConfigProvider {...props} profile={profile} permission={permission} routerList={routerList} routerCfgs={getRouterCfgs({profile, permission, routerList, i18ns: props.i18ns})} />;
};

const App = () => {
  const [apis] = useGetApis();
  const [i18ns] = useGetI18ns();
  if (!apis || !i18ns) {
    return <Spinner global />;
  }
  return isAuthed() ? <AuthedApp {...i18ns} /> : <ConfigProvider {...i18ns} routerCfgs={getRouterCfgs({i18ns: i18ns.i18ns})} />;
};

export default App;
