import Panel from '@app/components/panel';
import Intls from '@app/components/intl';
import Icon from '@app/components/icon';
import Button from '@app/components/base/button';

const Index = ({back, actions = []}) => (
  <Panel>
    <Button onClick={e => (typeof back === 'function' ? back() : history.back())} className="sm link">
      <Icon icon="ico-left" />
      <Intls keys="main.components.back">返回</Intls>
    </Button>
    {actions.map(({text, icon, className, ...rest}) => (
      <Button key={text} className={`sm ${className ?? ''}`} {...rest}>
        <Icon icon={icon} />
        <Intls>{text}</Intls>
      </Button>
    ))}
  </Panel>
);

export default Index;
