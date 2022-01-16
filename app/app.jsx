import {useEffect} from 'react';
import {useRouter} from 'ihuxy/router';
import Spinner from 'ihuxy-components/spinner';
import storage from 'ihuxy-utils/storage';
import clone from 'ihuxy-utils/clone';
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

const ConfigProvider = ({i18ns, language, profile, permission, routerList}) => {
  const {output, loading, store, updateRouter} = useRouter({...configs, routers: getRoutes({profile, i18ns, permission, routerList}), title: i18ns.title});
  useEffect(() => {
    const {setState, subscribe} = store;
    setState({permission, profile, i18ns, 'huxy-theme': getTheme(i18ns), 'huxy-language': language});
    const cancelLang = subscribe('huxy-language', async (lang) => {
      storage.set('language', lang);
      const {i18ns} = await getI18n();
      setState({i18ns, 'huxy-theme': getTheme(i18ns)});
      updateRouter({routers: clone(getRoutes({profile, i18ns, permission, routerList})), title: i18ns.title});
    });
    const cancelTheme = subscribe('huxy-theme', (theme) => setGlobalVar(theme));
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
  if (!permission) {
    return <Spinner global />;
  }
  return <ConfigProvider {...props} profile={profile} permission={permission} routerList={routerList} />;
};

const App = () => {
  const [apis] = useGetApis();
  const [i18ns] = useGetI18ns();
  if (!apis || !i18ns) {
    return <Spinner global />;
  }
  return isAuthed() ? <AuthedApp {...i18ns} /> : <ConfigProvider {...i18ns} />;
};

export default App;
