import {storage} from '@huxy/utils';
import {useThemeStore} from '@app/store/stores';
import getTheme from '@app/utils/getTheme';
import MoonIcon from '@app/components/icons/moon';
import SunIcon from '@app/components/icons/sun';

const ThemeModel = ({panel}) => {
  const [theme, setTheme] = useThemeStore();
  const {key} = theme;

  const handleClick = e => {
    const currentKey = key === 'dark' ? 'light' : 'dark';
    const current = getTheme(currentKey);
    storage.set('theme', current);
    setTheme(current);
  };
  
  return <a onClick={handleClick}>
    <span className="node-icon">{key === 'light' ? <SunIcon /> : <MoonIcon />}</span>
  </a>;
};

export default ThemeModel;
