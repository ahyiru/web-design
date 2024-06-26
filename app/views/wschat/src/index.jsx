import {useState, useEffect, useCallback, useRef} from 'react';
import {Input} from 'antd';
import {Anico, Drawer, Drop} from '@huxy/components';
import {formatTime, message} from '@huxy/utils';
import {useUpdate, useWinResize} from '@huxy/use';
import {userInfoStore} from '@app/store/stores';
import {wsChat} from '@app/apis/socket';
import {isAuthed} from '@app/utils/utils';
import report from '@app/apis/report/report';
import chatStore from './utils/chatStore';
import useTheme from './components/useTheme';
import {DropList} from './components';

import defAvatar from '@app/assets/images/user/4.png';
import SendIcon from '@app/components/icons/send';

import './style.less';

const scroolBottom = (ref, update) => {
  ref.scrollTop = ref.scrollHeight;
  update?.();
};

const delayScrool = (ref, update) => setTimeout(() => scroolBottom(ref, update), 0);

const {getData, setData} = chatStore();

const formatUser = user =>
  user.map(({userid, time}) => {
    const [name, email, ip] = userid.split('_huxy_');
    const label = name === 'test1' ? `${name}(${ip})` : name;
    return {value: userid, label, email, time};
  });

const ws = wsChat();

const Index = props => {
  const profile = userInfoStore.getState();
  profile.avatar = profile.avatar || defAvatar;
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [msgList, setMsgList] = useState(getData());
  const contentRef = useRef();
  const rerender = useUpdate();
  const {width, height} = useWinResize();

  const [themeToken, switchTheme] = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty('--containerHeight', `${height}px`);
  }, [height]);

  const getMsg = useCallback(msg => {
    setData(msg);
    setMsgList(getData());
    delayScrool(contentRef.current, rerender);
  }, []);

  const sendMsg = useCallback(msg => {
    if (!isAuthed()) {
      message.error(`用户未登录，请登录后再试！`);
      return;
    }
    setValue('');
    ws.emit('msg:send', msg);
    report({
      actionType: 'ws_chat',
      category: 'socket',
      text: 'msg',
      value: msg,
    });
  }, []);

  useEffect(() => {
    if (!isAuthed()) {
      message.error(`用户未登录，请登录后再试！`);
      return;
    }
    const userinfo = user => {
      const users = formatUser(user);
      setUsers(users);
    };
    const online = ({userid}) => {
      const [name, email, ip] = userid.split('_huxy_');
      const username = name === 'test1' ? `${name}(${ip})` : name;
      message.info(`${username}: 已上线！`);
    };
    const offline = ({userid}) => {
      const [name, email, ip] = userid.split('_huxy_');
      const username = name === 'test1' ? `${name}(${ip})` : name;
      message.info(`${username}: 已下线！`);
    };
    ws.connect();
    ws.on('msg:send', getMsg);
    ws.on('msg:userinfo', userinfo);
    ws.on('msg:online', online);
    ws.on('msg:offline', offline);
    return () => {
      ws.off('msg:send', getMsg);
      ws.off('msg:userinfo', userinfo);
      ws.off('msg:online', online);
      ws.off('msg:offline', offline);
      ws.disconnect();
    };
  }, []);

  const isSmall = width < 1024;

  return (
    <div className={`ws-chat-web-container ${themeToken.key}`}>
      {isSmall ? (
        <Drawer
          position="left"
          open={open}
          close={e => setOpen(false)}
          mountNode={document.getElementsByClassName('ws-chat-web-container')[0]}
          relative
          width="22rem"
          header="在线用户"
          style={{background: 'var(--botBg)'}}
        >
          <ul className="drawer-list">
            {users.map(({label, value}) => (
              <li key={value}>
                <a className="link">{label}</a>
              </li>
            ))}
          </ul>
        </Drawer>
      ) : (
        <div className="drawer-list small-screen">
          <div className="ws-menu-wrap">
            <div className="ws-menu-container">
              <div className="drawer-title">在线用户</div>
              <ul className="drawer-list">
                {users.map(({label, value}) => (
                  <li key={value}>
                    <a className="link">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="ws-chat-web-main">
        <div className="chatbot-web-header">
          {isSmall ? (
            <div className="bar title-coll" onClick={e => setOpen(!open)}>
              <Anico type={open ? 'close' : ''} />
            </div>
          ) : null}
          <h4 className="title">聊天室</h4>
          <Drop
            type="vertical"
            dropList={<DropList profile={profile} switchTheme={e => switchTheme(themeToken)} themeToken={themeToken} />}
            targetProps={{className: 'bar right'}}
            style={{
              '--bgColor': themeToken.key === 'dark' ? 'rgba(52, 53, 65, 1)' : 'rgba(32, 33, 35, 1)',
              '--borderColor': themeToken.key === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'hsla(0, 0%, 100%, 0.2)',
              '--linkColor': 'var(--asideLinkColor)',
            }}
          >
            <div className="bar title-dot right">
              <span className="dot" />
            </div>
          </Drop>
        </div>
        <div className="chatbot-web-content" ref={contentRef}>
          <div className="content-wrap">
            {msgList.map((item, i) => {
              const {role, time, content, avatar, name, ip} = item;
              const username = name === 'test1' ? `${name}(${ip})` : name;
              if (role === 'user') {
                return (
                  <div key={`${role}_${i}_${time}`} className="user-area">
                    <div className="message-wrap">
                      <span className="message-info">
                        {formatTime(new Date(time))}
                        <span> {profile.name}</span>
                      </span>
                      <div className={`user-message`}>{content}</div>
                    </div>
                    <div className="user-avatar">
                      <img height="90%" src={profile.avatar} alt={profile.name} />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={`${role}_${i}_${time}`} className="bot-area">
                    <div className="user-avatar">
                      <img height="90%" src={avatar || defAvatar} alt="zys" />
                    </div>
                    <div className="message-wrap">
                      <span className="message-info">
                        <span>{username} </span>
                        {formatTime(new Date(time))}
                      </span>
                      <div className={`user-message`}>{content}</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="chatbot-web-footer">
          <div className="input-area">
            <Input.TextArea
              bordered={false}
              autoSize={{maxRows: 1}}
              value={value}
              placeholder="发送消息！"
              onChange={e => setValue(e.target.value)}
              onPressEnter={e => {
                e.preventDefault();
                if (e.keyCode === 229) {
                  return;
                }
                sendMsg(value);
              }}
            />
          </div>
          <div className="send-btn" onClick={e => sendMsg(value)}>
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
