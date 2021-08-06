import {Button} from 'antd';
import fixIcons from '@app/utils/fixIcons';
import Panel from '@app/components/panel';
import eventStore from '@app/configs/eventStore';

const Index=({back,actions=[]})=>{
  const i18ns=eventStore.store.getState('i18ns');
  const i18nCfg=i18ns?.main.components??{};
  return <Panel>
    <Button onClick={e=>typeof back==='function'?back():history.back()} type="link" size="small" icon={fixIcons('LeftOutlined')}>{i18nCfg.back}</Button>
    {
      actions.map(({text,icon,...rest})=><Button key={text} size="small" {...rest} icon={fixIcons(icon)}>{text}</Button>)
    }
  </Panel>;
};

export default Index;

