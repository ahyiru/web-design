import {Link} from '@huxy/router';
const renderMenu = (menu, curName) =>
  menu.map(item => {
    const {path, name, open, children} = item;
    const active = name === curName;
    if (children?.length) {
      return (
        <li key={path || name} className={open ? 'open' : ''}>
          <Link to={{query: {name}}} className={`link${active ? ' active' : ''}`} preventDefault>
            <span>{name}</span>
          </Link>
          <ul>{renderMenu(children, curName)}</ul>
        </li>
      );
    }
    return (
      <li key={path || name}>
        <Link to={{query: {name}}} className={`link${active ? ' active' : ''}`}>
          <span>{name}</span>
        </Link>
      </li>
    );
  });

export default renderMenu;
