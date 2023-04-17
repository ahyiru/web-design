import {Link} from '@huxy/router';
import report from '@app/apis/report/report';
import Icon from '@app/components/icon';

const pathList = [
  {
    key: 'docs',
    name: '文档系统',
    icon: <Icon icon="FileMarkdownOutlined" />,
    path: '/md2html',
  },
  {
    key: 'filesystem',
    name: '文件系统',
    icon: <Icon icon="FileDoneOutlined" />,
    path: '/files',
  },
];
const linkList = [
  {
    key: 'scenedesign',
    name: 'scenes',
    icon: <Icon icon="ApiOutlined" />,
    type: 'link',
    link: 'http://ihuxy.com:7000',
  },
  {
    key: 'webgl',
    name: 'webgl',
    icon: <Icon icon="ApiOutlined" />,
    type: 'link',
    link: 'http://ihuxy.com:8081',
  },
  {
    key: 'PhoenixUI',
    name: 'PhoenixUI',
    icon: <Icon icon="ApiOutlined" />,
    type: 'link',
    link: 'http://ihuxy.com:8088/',
  },
  {
    key: 'chatbot',
    name: 'AI 助手',
    icon: <Icon icon="RobotOutlined" />,
    type: 'link',
    link: 'https://ihuxy.com/chatbot',
  },
  {
    key: 'chat',
    name: '聊天室',
    icon: <Icon icon="WechatOutlined" />,
    type: 'link',
    link: 'https://ihuxy.com/wschat',
  },
];

const ProjectList = ({close, isAdmin}) => {
  const validPathList = pathList.filter(({adminItem}) => !adminItem || (adminItem && isAdmin));
  return <div className="project-list">
    <div className="link-list">
      {
        linkList.map(({key, name, icon, link}) => <div key={key} className="pl-item">
          <a href={link} target="_blank" className="link" onClick={e => {
            e.stopPropagation();
            close();
            report({
              actionType: 'click',
              category: 'navbar',
              text: 'project',
              value: name,
            });
          }}>
            <span className="pl-icon">{icon}</span>
            <span className="pl-name">{name}</span>
          </a>
        </div>)
      }
    </div>
    <div className="path-list">
      {
        validPathList.map(({key, name, icon, path}) => <div key={key} className="pl-item">
          <Link to={path} className="link" onClick={e => {
            close();
            report({
              actionType: 'click',
              category: 'navbar',
              text: 'project',
              value: name,
            });
          }}>
            <span className="pl-icon">{icon}</span>
            <span className="pl-name">{name}</span>
          </Link>
        </div>)
      }
    </div>
  </div>;
};

export default ProjectList;
