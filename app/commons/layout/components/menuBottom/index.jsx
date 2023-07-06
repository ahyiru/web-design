import {Link} from '@huxy/router';
import {Anico} from '@huxy/components';
import report from '@app/apis/report/report';
import {getIntls} from '@app/components/intl';

import './index.less';

const Index = ({collapsed, setCollapsed, isSmall}) => {
  return (
    <div className="menu-collapsed">
      {
        isSmall ? null : <span
          className="link collapsed-bar"
          onClick={() => {
            setCollapsed(!collapsed);
            report({
              actionType: 'click',
              category: 'menuBottom',
              text: 'collapsed',
              value: collapsed ? 'close' : 'open',
            });
          }}
          title="collapse"
        >
          <Anico type={collapsed ? 'right' : ''} />
        </span>
      }
      {(!isSmall && collapsed) ? null : (
        <Link
          to="https://ihuxy.com/md2html"
          target="_blank"
          className="link-bar"
          onClick={() => {
            report({
              actionType: 'click',
              category: 'menuBottom',
              text: '文档',
              value: 'doc',
            });
          }}
        >
          {getIntls('nav.left', {}).doc}
        </Link>
      )}
    </div>
  );
};

export default Index;
