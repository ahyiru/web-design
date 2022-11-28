import {useEffect} from 'react';
import ECharts from 'echarts-for-react';
import {Spinner} from '@huxy/components';
import {useUpdate} from '@huxy/use';
import {useStore} from '@app/store';
import darkScreen from '../data/darkScreen';

const ak = 'a7oSYS987EhqfPfMrZFbQ7PWUSxUVUmj';

const addScript = url => new Promise((resolve, reject) => {
  const loaded = [...document.getElementsByTagName('script')].find(item => item.src === url);
  if (!loaded) {
    const script = document.createElement('script');
    script.onerror = event => reject(new Error(`Failed to load '${url}'`));
    script.onload = resolve;
    // script.async = true;
    script.src = url;
    (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
  } else {
    resolve();
  }
});

let charts = '';

const ReactChart = ({style, option, ...rest}) => {
  const rerender = useUpdate();
  const [, setState, subscribe] = useStore('huxy-react-echarts', false);
  useEffect(() => {
    const cancelSub = subscribe(result => {
      result && rerender();
    });
    const getCharts = async () => {
      charts = 'loading';
      try {
        await addScript(`https://api.map.baidu.com/getscript?v=3.0&ak=${ak}`);
        await import('echarts/extension/bmap/bmap');
        const echarts = await import('echarts');
        echarts.registerTheme('dark-screen', darkScreen);
        charts = echarts;
        setState(true);
      } catch(err) {
        charts = {
          error: 'load error',
        };
        setState(true);
      }
    };
    !charts && getCharts();
    return () => cancelSub();
  }, []);
  if (typeof charts !== 'object') {
    return <Spinner />;
  }
  return <ECharts notMerge={true} option={typeof option ==='function' ? option(charts) : option} theme="dark-screen" style={{...style}} {...rest} />;
};

export default ReactChart;
