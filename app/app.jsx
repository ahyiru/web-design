import {useEffect} from 'react';
import {useRouter} from '@huxy/router';
import {Spinner} from '@huxy/components';
import {storage} from '@huxy/utils';
import routerCfgs from '@app/configs/router';
import getTheme from '@app/utils/getTheme';
import getI18n from '@app/utils/getI18n';
import useGetI18ns from '@app/hooks/useGetI18ns';
import useGetProfile from '@app/hooks/useGetProfile';
import {isAuthed} from '@app/utils/utils';
import getRouterCfgs from '@app/utils/getRouterCfgs';
import setGlobalVar from '@app/utils/setGlobalVar';
import {langStore, themeStore} from '@app/store/stores';

const ConfigProvider = ({routerCfgs}) => {
  const {output, loading, updateRouter} = useRouter(routerCfgs);
  useEffect(() => {
    const cancelTheme = themeStore.subscribe(setGlobalVar);
    themeStore.setState(getTheme());
    const cancelLang = langStore.subscribe(async lang => {
      storage.set('language', lang);
      await getI18n();
      themeStore.setState(getTheme());
      updateRouter(getRouterCfgs());
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

const AuthedApp = props => {
  const [loading] = useGetProfile();
  if (loading) {
    return <Spinner global />;
  }
  return <ConfigProvider routerCfgs={{...routerCfgs, ...getRouterCfgs()}} />;
};

const App = () => {
  const [loading] = useGetI18ns();
  if (loading) {
    return <Spinner global />;
  }
  return isAuthed() ? <AuthedApp /> : <ConfigProvider routerCfgs={{...routerCfgs, ...getRouterCfgs()}} />;
};

export default App;
