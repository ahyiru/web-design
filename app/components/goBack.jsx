import Panel from '@app/components/panel';
import Icon from '@app/components/icon';
import Button from '@app/components/base/button';

import Intls from '@app/components/intl';

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const backStyle = {
  width: '100px',
};
const titleStyle = {
  width: '100%',
  paddingRight: '50px',
  fontSize: '1.6rem',
  fontWeight: 500,
  textAlign: 'center',
};
const actionStyle = {
  maxWidth: '500px',
};

const Index = ({back, title, actions = [], backText = '返回'}) => (
  <Panel>
    <div style={containerStyle}>
      <div style={backStyle}>
        <Button onClick={e => (typeof back === 'function' ? back() : history.back())} className="sm link">
          <Icon icon="ico-left" />
          <span><Intls keys="main.components.back">{backText}</Intls></span>
        </Button>
      </div>
      {
        title && <div style={titleStyle}>{title}</div>
      }
      {
        actions.length ? <div style={actionStyle}>
          {
            actions.map(({text, icon, className, style, ...rest}, i) => (
              <Button key={text} className={`sm ${className ?? ''}`} style={{marginLeft: i ? 12 : 0, ...style}} {...rest}>
                <Icon icon={icon} />
                <span>{text}</span>
              </Button>
            ))
          }
        </div> : null
      }
    </div>
  </Panel>
);

export default Index;
