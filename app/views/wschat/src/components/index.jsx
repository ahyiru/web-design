import {Link} from '@huxy/router';

export const DropList = ({profile, switchTheme, themeToken}) => {
  return (
    <ul className="ws-userinfo-drop">
      {profile.name ? (
        <li>
          <a className="link">
            <img src={profile.avatar} alt="user" height="50%" style={{borderRadius: '50%'}} crossOrigin="anonymous" />
            <span style={{marginLeft: '8px'}}>{profile.name}</span>
          </a>
        </li>
      ) : (
        <li>
          <Link to="/user/signin">登录</Link>
        </li>
      )}
      <li>
        <a className="link" onClick={switchTheme}>
          {themeToken.key === 'light' ? '黑暗' : '明亮'}模式
        </a>
      </li>
    </ul>
  );
};

export const isDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const sysThemeMode = setTheme => {
  if (!window.matchMedia) {
    return;
  }
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  query.addEventListener(
    'change',
    e => {
      setTheme(isDarkMode());
    },
    false,
  );
  setTheme(isDarkMode());
};
