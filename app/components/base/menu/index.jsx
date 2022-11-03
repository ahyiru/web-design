import {useRef} from 'react';
import {traverItem} from '@huxy/utils';
import {useClickAway, useUpdate} from '@huxy/use';
import './index.less';

const Index = ({data = []}) => {
  const rerender = useUpdate();
  const itemClick = (e, item) => {
    e.stopPropagation();
    traverItem(v => {
      if (item.value === v.value) {
        if (item.list?.length) {
          v.open = !item.open;
        } else {
          v.active = true;
        }
      } else {
        v.open = false;
        v.active = false;
      }
    })(data);
    rerender();
  };

  return (
    <div className="menu-wrap">
      <ul className="menu-container">
        {data.map((li, i) => (
          <LiItem key={li.value} li={li} itemClick={itemClick} />
        ))}
      </ul>
    </div>
  );
};

const LiItem = ({li, itemClick}) => {
  const liRef = useRef();
  useClickAway(liRef, e => li.open && itemClick(e, li));
  return (
    <li ref={liRef} className={`${li.open ? 'open' : ''}`} onClick={e => itemClick(e, li)}>
      <a className={`menu-follow${li.active ? ' active' : ''}`}>
        <span>{li.name}</span>
        {li.list?.length ? <i className={`menu-angle-${li.open ? 'top' : 'bt'}`} /> : null}
      </a>
      {li.list?.length ? (
        <ul className="menu-arrow-rt">
          {li.list.map(item => (
            <li key={item.value}>
              <a className="menu-tooltip" tooltip={item.name}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default Index;
