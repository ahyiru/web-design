import {Link} from '@huxy/router';
// import TopRight from './topRight';
import './index.less';

const Index = ({current, Right}) => {
  current = current.filter(v => v.name);
  const name = (
    <li>
      <span className="link" style={{fontSize: '1.6rem'}}>
        {current.slice(-1)[0]?.name}
      </span>
    </li>
  );
  const bread = current.map(({path, name}) => (
    <li key={path}>
      <Link className="link" to={path}>
        {name}
      </Link>
    </li>
  ));
  const isRightBread = current.length > 1;
  const leftBar = isRightBread ? name : bread;
  const rightBar = Right ? <Right /> : isRightBread ? bread : null;
  return (
    <div className="main-top">
      <ul className={`left-bar${isRightBread ? '' : ' bread'}`}>{leftBar}</ul>
      <ul className={`right-bar${isRightBread ? ' bread' : ''}`}>{rightBar}</ul>
    </div>
  );
};

export default Index;
