import {forwardRef, useState} from 'react';
import {Drop} from '@huxy/components';
import Icon from '@app/components/icon';

const selectedType = {
  background: 'rgba(0,0,0,.15)',
  color: 'var(--blue1)',
};
const Index = ({icon, name, format, active, className, dropList, defaultValue, onClick, formatType, component, handle, ...rest}, ref) => {
  const [selectedKey, setSelectedKey] = useState(defaultValue);
  const activeCls = active ? ` active` : '';
  const cls = className ? `${activeCls} ${className}` : activeCls;

  if (dropList?.length) {
    return <a {...rest} className={`tools-bar-icon${cls}`} tooltips={selectedKey}>
      {
        rest.disabled ? selectedKey : <Drop type="vertical" dropList={
          <ul className="icon-drop-area">
            {dropList.map(({format: key}) => (
              <li key={key} style={{[format]: key, ...(selectedKey === key ? selectedType : null)}} onClick={
                e => {
                  setSelectedKey(key);
                  onClick(e);
                }
              }>
                {key}
              </li>
            ))}
          </ul>
        }>
          {selectedKey}
        </Drop>
      }
    </a>;
  }

  return (
    <a {...rest} className={`tools-bar-icon${cls}`} tooltips={name} onMouseDown={rest.disabled ? null : onClick}>
      <Icon icon={icon} />
    </a>
  );
};

export default forwardRef(Index);
