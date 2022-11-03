import configs from './configs';
import Yao from '../yao';

import styles from './index.less';

const Index = ({yaoProps, rotate, height, width, style, ...rest}) => <div
  className={styles['huxy-gua-container']}
  style={{
    '--width': width,
    '--height': height,
    ...style,
  }}
  {...rest}
>
  {
    configs.map(({value, label, details, yao, position}) => (
      <div key={value} className={styles['huxy-gua']} style={{transform: `translate(-50%, -50%) rotate(${45 * (position + rotate)}deg)`}}>
        <p className={styles['gua-desc']}>{details}</p>
        <h4 className={styles['gua-name']}>{label}</h4>
        <p className={styles['gua-desc']}>{value}</p>
        <Yao yao={yao} {...yaoProps} width={width} />
      </div>
    ))
  }
</div>;

export default Index;
