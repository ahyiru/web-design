import {useEffect} from 'react';
import ECharts from 'echarts-for-react';
import {Spinner} from '@huxy/components';
import {useUpdate} from '@huxy/use';
import {addScript} from '@huxy/utils';
import {useStore} from '@app/store';
import darkScreen from '../data/darkScreen';

const ak = 'a7oSYS987EhqfPfMrZFbQ7PWUSxUVUmj';

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
      } catch (err) {
        charts = {
          error: 'load echarts failed, please refresh and try again!',
        };
        setState(true);
      }
    };
    (!charts || charts.error) && getCharts();
    return () => cancelSub();
  }, []);
  if (typeof charts !== 'object') {
    return <Spinner />;
  }
  if (charts.error) {
    return <div style={{color: 'var(--red2)'}}>{charts.error}</div>;
  }
  return <ECharts option={typeof option === 'function' ? option(charts) : option} theme="dark-screen" style={{...style}} {...rest} />;
};

export default ReactChart;
