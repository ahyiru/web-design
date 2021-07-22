import {logout} from '@app/utils/utils';
import './index.less';
const NotFound=props=>{
  return <div className="not-found">
    <div className="content">
      <h2><b style={{color:'red'}}>{props.inputPath}</b> is not found.</h2>
      <h2>返回<a onClick={e=>props.router.push('/')}>首页</a></h2>
      <h2><a onClick={e=>logout()}>切换用户</a></h2>
    </div>
  </div>;
};

export default NotFound;
