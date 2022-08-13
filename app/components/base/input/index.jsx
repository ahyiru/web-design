import styles from './index.less';

const Index = ({className, ...rest}) => {
  const cls = ['h-input', ...(className?.split(' ') ?? [])]
    .filter(Boolean)
    .map(c => styles[c])
    .join(' ');
  return <input className={cls} {...rest} />;
};

export default Index;
