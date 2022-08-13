import styles from './index.less';

const Index = ({className, ...rest}) => {
  const cls = ['h-btn', ...(className?.split(' ') ?? [])]
    .filter(Boolean)
    .map(c => styles[c])
    .join(' ');
  return <button className={cls} {...rest} />;
};

export default Index;
