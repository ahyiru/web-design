import {Button} from 'antd';
import fixIcons from '@app/utils/fixIcons';
import Panel from '@app/components/panel';
import Intls from '@app/components/intl';

const Index = ({back, actions = []}) => <Panel>
  <Button onClick={(e) => (typeof back === 'function' ? back() : history.back())} type="link" size="small" icon={fixIcons('LeftOutlined')}>
    <Intls keys="main.components.back">返回</Intls>
  </Button>
  {actions.map(({text, icon, ...rest}) => (
    <Button key={text} size="small" {...rest} icon={fixIcons(icon)}>
      <Intls>{text}</Intls>
    </Button>
  ))}
</Panel>;

export default Index;
