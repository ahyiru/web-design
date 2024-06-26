import {Link} from '@huxy/router';
import {getIntls} from '@app/components/intl';

import './index.less';

const Index = props => {
  const i18ns = getIntls('nav.footer', {});
  return (
    <div className="footer-wrap">
      <div className="copyright">
        <a className="copy" href="https://ihuxy.com">
          {i18ns.copy}
        </a>
        <a className="right" href="https://beian.miit.gov.cn/">
          {i18ns.right}
        </a>
      </div>
      <ul className="link-list">
        <li>
          <Link className="link" target="_blank" to="https://ihuxy.com/md2html?folder=%E5%85%B3%E4%BA%8E%E6%88%91%E4%BB%AC&name=AboutUs">
            {i18ns.about}
          </Link>
        </li>
        <li>
          <Link className="link" target="_blank" to="https://ihuxy.com/md2html?folder=%E5%85%B3%E4%BA%8E%E6%88%91%E4%BB%AC&name=AboutUs">
            {i18ns.team}
          </Link>
        </li>
        <li>
          <Link className="link" target="_blank" to="https://ihuxy.com/md2html?folder=%E5%85%B3%E4%BA%8E%E6%88%91%E4%BB%AC&name=AboutUs">
            {i18ns.contact}
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Index;
