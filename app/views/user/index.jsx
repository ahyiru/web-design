import Intls from '@app/components/intl';
import logo from '@app/assets/images/logo.png';
import styles from './index.less';

const Index = props => (
  <div className={styles.page}>
    <div className={styles['login-panel']}>
      <div className={styles.title}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <h2>
          <Intls keys="title">Dashboard</Intls>
        </h2>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
    <div className={styles.copyright}>
      <a className={styles.copy}>©2022 ihuxy</a>
      <a className={styles.right} href="https://beian.miit.gov.cn/">
        京ICP备15005899号-2
      </a>
    </div>
  </div>
);

export default Index;
