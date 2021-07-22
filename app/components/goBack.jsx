import {Button} from 'antd';
import fixIcons from '@app/utils/fixIcons';
import Panel from '@app/components/panel';

const Index=({actions=[]})=><Panel>
  <Button onClick={e=>history.back()} type="link" size="small" icon={fixIcons('LeftOutlined')}>返回</Button>
  {
    actions.map(({text,icon,...rest})=><Button key={text} size="small" {...rest} icon={fixIcons(icon)}>{text}</Button>)
  }
</Panel>;

export default Index;

