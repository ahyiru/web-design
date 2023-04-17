import {storage} from '@huxy/utils';
import {useThemeStore} from '@app/store/stores';
import getTheme from '@app/utils/getTheme';
import MoonIcon from '@app/components/icons/moon';
import SunIcon from '@app/components/icons/sun';

const ThemeModel = props => {
  const {label, ...rest} = props;
  const [theme, setTheme] = useThemeStore();
  const {key} = theme;

  const handleClick = e => {
    // e.stopPropagation();
    const currentKey = key === 'dark' ? 'light' : 'dark';
    const current = getTheme(currentKey);
    storage.set('theme', current);
    setTheme(current);
  };

  return (
    <span className="link" onClick={handleClick} title={key} {...rest}>
      <span className="node-icon">{key === 'light' ? <SunIcon /> : <MoonIcon />}</span>
      {label && <span style={{marginLeft: '6px'}}>{label}</span>}
    </span>
  );
};

export default ThemeModel;
