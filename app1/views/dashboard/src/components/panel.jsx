import DefPanel from '@app/components/panel';

const Panel = ({style, ...rest}) => <DefPanel {...rest} style={{borderColor: 'rgba(0, 180, 220, 0.08)', ...style}} />;

export default Panel;
