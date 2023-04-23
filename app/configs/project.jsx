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

const LinkTo = ({name, icon, path, link, close}) => {
  const commonProps = {
    className: 'link',
    onClick: e => {
      e?.stopPropagation();
      close();
      report({
        actionType: 'click',
        category: 'navbar',
        text: 'project',
        value: name,
      });
    },
  };
  const ProjLink = ({children}) => path ? <Link to={path} {...commonProps}>{children}</Link> : <a href={link} target="_blank" {...commonProps}>{children}</a>;
  
  return <div className="pl-item">
    <ProjLink>
      <span className="pl-icon">{icon}</span>
      <span className="pl-name">{name}</span>
    </ProjLink>
  </div>;
};

const ProjectList = ({close, isAdmin}) => {
  const validPathList = pathList.filter(({adminItem}) => !adminItem || (adminItem && isAdmin));
  return <div className="project-list">
    <div className="link-list">
      {
        linkList.map(({key, ...rest}) => <LinkTo key={key} {...rest} close={close} />)
      }
    </div>
    <div className="path-list">
      {
        validPathList.map(({key, ...rest}) => <LinkTo key={key} {...rest} close={close} />)
      }
    </div>
  </div>;
};

export default ProjectList;
