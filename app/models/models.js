import icons from './icons';
import objs from './objs';

const models = objs.map(({icon, ...rest}) => ({...rest, icon: icons[icon]}));

export default models;