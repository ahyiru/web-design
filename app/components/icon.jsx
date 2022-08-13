import fixIcons from '@app/utils/fixIcons';
import icons from '@app/utils/icons';

const Icon =
  iconList =>
    ({icon, defaultIcon = null}) =>
      icon ? fixIcons(iconList)(icon) : defaultIcon;

export default Icon(icons);
