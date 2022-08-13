import {forwardRef, useState, useRef} from 'react';
import {useClickAway} from '@huxy/use';
import Icon from '@app/components/icon';

const selectedType = {
  background: 'rgba(0,0,0,.2)',
  color: 'var(--blue1)',
};
const Index = ({icon, name, format, active, className, dropList, selectedKey, defaultValue, onClick, formatType, ...rest}, ref) => {
  const [show, setShow] = useState(false);
  const iconRef = useRef();
  // ref=iconRef;
  const activeCls = active ? ` active` : '';
  const cls = className ? `${activeCls} ${className}` : activeCls;
  useClickAway(iconRef, e => show && setShow(false));
  const handleClick = (e, hasDrop) => {
    e.preventDefault();
    if (hasDrop) {
      setShow(prev => !prev);
    } else {
      onClick();
    }
  };
  const showIcon = dropList?.length ? (
    <>
      {selectedKey || defaultValue}
      {show && (
        <ul className="icon-drop-area">
          {dropList.map(({format: key}) => (
            <li key={key} style={{[format]: key, ...(selectedKey === key ? selectedType : null)}}>
              {key}
            </li>
          ))}
        </ul>
      )}
    </>
  ) : (
    <Icon icon={icon} />
  );

  return (
    <span {...rest} ref={iconRef} className={`tools-bar-icon${cls}`} tooltips={name} onMouseDown={e => handleClick(e, dropList?.length)}>
      {showIcon}
    </span>
  );
};

export default forwardRef(Index);
