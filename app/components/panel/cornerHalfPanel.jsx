import {Panel} from '@huxy/components';

const Index = ({size = '8px', style, children, ...rest}) => (
  <Panel className="corner-half" style={{background: 'var(--panelBgColor)', '--cornerSize': size, ...style}} {...rest}>
    {children}
  </Panel>
);

export default Index;
