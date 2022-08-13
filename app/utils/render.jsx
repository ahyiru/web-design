import {createElement} from 'react';
import components from './components';
import {formatProps, formatChildren} from './formatProps';
import setGlobalConfigs from './configs';
setGlobalConfigs();
const render = (schema, params, commonprops = null) => {
  schema = Array.isArray(schema) ? schema : [schema];
  const dom = schema.map((item, i) => {
    let {type, props, children} = item;
    type = (type || 'div').trim();
    const first = type.charAt(0);
    type = first.toUpperCase() === first ? components[type] || 'div' : type;
    props = {
      key: i,
      ...formatProps(props, params),
    };
    if (commonprops && typeof type !== 'string') {
      props.commonprops = commonprops;
    }
    children = Array.isArray(children) ? render(children, params, commonprops) : [formatChildren(children || props.children, params) ?? null];
    return createElement(type, props, ...children);
  });
  return dom;
};

export default render;
