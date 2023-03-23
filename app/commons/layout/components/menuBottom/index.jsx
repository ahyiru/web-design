import {Link} from '@huxy/router';
import {Anico} from '@huxy/components';

import report from '@app/apis/report/report';

import './index.less';

const Index = ({collapsed, setCollapsed}) => {
  return (
    <div className="menu-collapsed">
      <span
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
      {!collapsed && (
        <Link
          to="http://ihuxy.com:8088/"
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
          文档
        </Link>
      )}
    </div>
  );
};

export default Index;
