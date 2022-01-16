import {useEffect, useState} from 'react';
import {Link} from 'ihuxy/router';
import renderMenu from './renderMenu';
import RenderPage from './renderPage';
import listFiles from './getFiles';
import './index.less';

const Index = (props) => {
  const {params, router} = props;
  const {folder, name} = params;
  const [list, setList] = useState([]);
  useEffect(() => {
    const getFiles = async () => {
      const files = await listFiles();
      setList(files);
      if (!folder) {
        router.push({query: {folder: files[0]?.name, name: files[0]?.children[0]?.name}});
      }
    };
    getFiles();
  }, []);
  const sidebar = list.find((item) => item.name === folder)?.children ?? [];
  return (
    <div className="doc-frame">
      <div className="doc-header">
        <div className="doc-banner">文档系统</div>
        <ul className="doc-nav">
          {list.map(({name, children}) => (
            <li key={name}>
              <Link to={{query: {folder: name, name: children[0]?.name}}} className={name === folder ? 'active' : ''}>
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="doc-container">
        <div className="doc-main-page">
          <RenderPage router={router} curName={name} context={sidebar} />
        </div>
        <div className="doc-menu">
          <ul className="doc-menu-root">{renderMenu(sidebar, name)}</ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
