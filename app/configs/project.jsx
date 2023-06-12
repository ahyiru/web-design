import {Link} from '@huxy/router';
import report from '@app/apis/report/report';
import Icon from '@app/components/icon';
import {notAdmin, isMember} from '@app/utils/isAdmin';

const pathList = (isAdmin, isMem) => [
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
  {
    key: 'chatbot',
    name: 'AI 助手',
    icon: <Icon icon="RobotOutlined" />,
    path: isMem ? '/paychat' : '/chatbot',
  },
  {
    key: 'chat',
    name: '聊天室',
    icon: <Icon icon="WechatOutlined" />,
    path: '/wschat',
  },
  ...(isAdmin ? [
    {
      key: 'online',
      name: '在线用户',
      icon: <Icon icon="TeamOutlined" />,
      path: '/online',
    },
    {
      key: 'send-messages',
      name: '发信息',
      icon: <Icon icon="SendOutlined" />,
      path: '/send-messages',
    },
  ] : []),
];
const linkList = [
  {
    key: 'docs',
    name: '文档系统',
    icon: <Icon icon="FileMarkdownOutlined" />,
    path: '/md2html',
  },
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
    link: 'http://ihuxy.com:8088',
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

const ProjectList = ({close}) => {
  const isAdmin = !notAdmin();
  const isMem = isMember();
  const validPathList = pathList(isAdmin, isMem);
  return <div className="project-list">
    <div className="path-list">
      {
        validPathList.map(({key, ...rest}) => <LinkTo key={key} {...rest} close={close} />)
      }
    </div>
    <div className="link-list">
      {
        linkList.map(({key, ...rest}) => <LinkTo key={key} {...rest} close={close} />)
      }
    </div>
  </div>;
};

export default ProjectList;
