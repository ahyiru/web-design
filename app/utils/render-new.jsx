import {createElement} from 'react';
import {formatProps, formatChildren} from './formatProps';

const render = (schema, params, commonprops = null) => {
  schema = Array.isArray(schema) ? schema : [schema];
  const dom = schema.map((item, i) => {
    let {type, props, children} = item;
    type = typeof type === 'string' ? type.trim() : type || 'div';
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
