import {Button} from 'antd';
import Panel from '@app/components/panel';
import Intls from '@app/components/intl';
import Icon from '@app/components/icon';

const Index = ({back, actions = []}) => (
  <Panel>
    <Button onClick={e => (typeof back === 'function' ? back() : history.back())} type="link" size="small" icon={<Icon icon="LeftOutlined" />}>
      <Intls keys="main.components.back">返回</Intls>
    </Button>
    {actions.map(({text, icon, ...rest}) => (
      <Button key={text} size="small" {...rest} icon={<Icon icon={icon} />}>
        <Intls>{text}</Intls>
      </Button>
    ))}
  </Panel>
);

export default Index;
