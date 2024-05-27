import {useEffect} from 'react';
import {useWinResize} from '@huxy/use';

import Intls from '@app/components/intl';
import * as styles from './index.less';
import {logo} from '../configs';

const Index = props => {
  const {height} = useWinResize();
  useEffect(() => {
    document.documentElement.style.setProperty('--containerHeight', `${height}px`);
  }, [height]);
  return <div className={styles.page}>
    <div className={styles['login-panel']}>
      <div className={styles.title}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <h2>
          <Intls keys="title">Ihuxy</Intls>
        </h2>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
    <div className={styles.copyright}>
      <a className={`${styles.copy} link`} href="https://ihuxy.com">
        <Intls keys="nav.footer.copy">©2023 Ihuxy</Intls>
      </a>
      <a className={`${styles.right} link`} href="https://beian.miit.gov.cn/">
        <Intls keys="nav.footer.right">京ICP备15005899号-2</Intls>
      </a>
    </div>
  </div>;
};

export default Index;
