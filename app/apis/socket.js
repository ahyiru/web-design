import {io} from 'socket.io-client';
import {storage, once, message} from '@huxy/utils';
import {notifyStore} from '@app/store/stores';

const wsMsgUrl = `${window.location.origin}/ws-message`;

const wsChatUrl = `${window.location.origin}/ws-chat`;

export const wsMsg = () => io(wsMsgUrl, {
  auth: {Authorization: `yiru ${storage.get('token')}`},
  // autoConnect: false,
});

export const wsChat = () => io(wsChatUrl, {
  auth: {Authorization: `yiru ${storage.get('token')}`},
  autoConnect: false,
});

const initWS = () => {
  const ws = wsMsg();
  ws.on('msg:send', ({title, context}) => {
    message.info({
      dir: 'right',
      message: `消息推送：${title}！\n${context}`,
    });
    notifyStore.setState(count => count + 1);
  });
  ws.on('msg:online', ({userid, count}) => {
    const [name, email, ip] = userid.split('_huxy_');
    message.info({
      dir: 'right',
      message: `${name}: ${ip} 已上线！\n当前在线用户数: ${count}`,
    });
  });
  ws.on('msg:offline', ({userid, count}) => {
    const [name, email, ip] = userid.split('_huxy_');
    message.info({
      dir: 'right',
      message: `${name}: ${ip} 已下线！\n当前在线用户数: ${count}`,
    });
  });
};

export default once(initWS);
