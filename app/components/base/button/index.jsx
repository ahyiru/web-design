import * as styles from './index.less';

const Index = ({className, type = '', size = '', ...rest}) => {
  const cls = ['h-btn', ...(className?.split(' ') ?? []), type, size]
    .filter(Boolean)
    .map(c => styles[c])
    .join(' ');
  return <button className={cls} {...rest} />;
};

export default Index;
