import styles from './index.less';

const Index = ({yao = [], width, height, bgColor, style, ...rest}) => (
  <div
    className={styles['huxy-yao']}
    style={{
      '--yao-width': width,
      '--yao-height': height,
      '--yao-bgColor': bgColor,
      ...style,
    }}
    {...rest}
  >
    {yao.map((item, i) => (
      <div key={`${item}-${i}`} className={item ? styles.yang : styles.yin} />
    ))}
  </div>
);

export default Index;
