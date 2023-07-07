import {Link} from '@huxy/router';
import {storage} from '@huxy/utils';
import report from '@app/apis/report/report';
import Icon from '@app/components/icon';
import {notAdmin} from '@app/utils/isAdmin';

const pathList = (isAdmin, i18ns) => [
  {
    key: 'docs',
    name: i18ns.docs ?? '文档系统',
    icon: <Icon icon="FileMarkdownOutlined" />,
    // type: 'link',
    // link: `https://ihuxy.com/md2html`,
    path: '/md2html',
  },
  {
    key: 'filesystem',
    name: i18ns.files ?? '文件系统',
    icon: <Icon icon="FileDoneOutlined" />,
    // type: 'link',
    // link: `https://ihuxy.com/files?authed_token=${storage.get('token')}`,
    path: '/files',
  },
  {
    key: 'chat',
    name: i18ns.chat ?? '聊天室',
    icon: <Icon icon="WechatOutlined" />,
    type: 'link',
    link: `https://ihuxy.com/wschat?authed_token=${storage.get('token')}`,
  },
  {
    key: 'chatbot',
    name: i18ns.chatbot ?? 'AI助手',
    icon: <Icon icon="RobotOutlined" />,
    type: 'link',
    link: `https://ihuxy.com/chatbot?authed_token=${storage.get('token')}`,
  },
];
const linkList = [
  {
    key: 'huxy',
    name: 'Huxy Admin',
    icon: <Icon icon="ApiOutlined" />,
    type: 'link',
    link: 'https://yiru.gitee.io/huxy-admin',
  },
  {
    key: 'scenedesign',
    name: 'Scenes',
    icon: <Icon icon="ApiOutlined" />,
    type: 'link',
    link: 'http://ihuxy.com:7000',
  },
  {
    key: 'webgl',
    name: 'WebGL',
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

const ProjectList = ({close, i18ns}) => {
  const isAdmin = !notAdmin();
  const validPathList = pathList(isAdmin, i18ns);
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
