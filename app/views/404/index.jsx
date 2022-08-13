import {logout} from '@app/utils/utils';
import Intls from '@app/components/intl';
import './index.less';
const NotFound = props => {
  return (
    <div className="not-found">
      <div className="content">
        <h2>
          <b style={{color: 'red'}}>{props.inputPath}</b>
          <Intls> is not found.</Intls>
        </h2>
        <h2>
          <Intls>返回</Intls>
          <a onClick={e => props.router.push('/')}>
            <Intls>首页</Intls>
          </a>
        </h2>
        <h2>
          <a onClick={e => logout()}>
            <Intls>切换用户</Intls>
          </a>
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
