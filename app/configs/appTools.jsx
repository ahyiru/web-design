import html2canvas from 'html2canvas';
import {dlfile, fullScreen} from '@huxy/utils';
import Icon from '@app/components/icon';
import report from '@app/apis/report/report';

import {message} from '@app/utils/staticFunction';
import getWeb3 from '@app/web3/getWeb3';

import FullPage from '@app/components/fullScreen';
import metamask from '@app/assets/images/metamask.svg';
import GithubIcon from '@app/components/icons/github';

const appList = [
  {
    key: 'github',
    name: 'Github',
    icon: <GithubIcon />,
    handler: () => {
      window.open('https://github.com/ahyiru/web-design');
    },
  },
  {
    key: 'metamask',
    name: 'MetaMask',
    icon: <img src={metamask} alt="metamask" />,
    handler: async () => {
      try {
        const result = await getWeb3();
        const addr = result.accounts?.[0];
        if (addr) {
          message.success(`已连接${addr}`);
        }
      } catch (error) {
        message.error(error.code ? error.message : '未检测到MetaMask插件！');
      }
    },
  },
];
const toolList = [
  {
    key: 'fullscreen',
    name: '全屏',
    icon: <FullPage onClick={e => {}} />,
    handler: () => {
      fullScreen();
    },
  },
  {
    key: 'screencapture',
    name: '截屏',
    icon: <Icon icon="CameraOutlined" />,
    handler: () => {
      html2canvas(document.getElementById('app'), {
        useCORS: true,
        foreignObjectRendering: true,
        allowTaint: true,
        logging: false,
      })
        .then(canvas => {
          dlfile(canvas.toDataURL());
          message.success('下载成功！');
        })
        .catch(error => {
          message.error(error);
        });
    },
  },
];

const AppTools = () => {
  return <div className="app-tools">
    <div className="app-list">
      {
        appList.map(({key, name, icon, handler}) => <span key={key} className="link" onClick={e => {
          e.stopPropagation();
          handler();
          report({
            actionType: 'click',
            category: 'navbar',
            text: 'app-tools',
            value: name,
          });
        }} title={name}>
          <span className="at-icon">{icon}</span>
          <span className="at-name">{name}</span>
        </span>)
      }
    </div>
    <div className="tool-list">
      {
        toolList.map(({key, name, icon, handler}) => <span key={key} className="link" onClick={e => {
          e.stopPropagation();
          handler();
          report({
            actionType: 'click',
            category: 'navbar',
            text: 'app-tools',
            value: name,
          });
        }} title={name}>
          <span className="at-icon">{icon}</span>
          <span className="at-name">{name}</span>
        </span>)
      }
    </div>
  </div>;
};

export default AppTools;
