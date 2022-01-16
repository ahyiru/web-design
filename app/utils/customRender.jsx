import render from './render';
import formatData from './formatData';

const customRender = (data, params, commonprops) => render(formatData(data, params), commonprops);

export default customRender;
