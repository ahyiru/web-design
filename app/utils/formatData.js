import str2code from 'ihuxy-utils/str2code';
import matchedStr from 'ihuxy-utils/matchedStr';
import isObject from 'ihuxy-utils/isObject';

const typeValue = {
  boolean: (key, value) => ({[key]: !!value}),
  number: (key, value) => ({[key]: ~~value}),
  code: (key, value, params) => {
    value = str2code(value);
    value = typeof value === 'function' ? value(params) : value;
    return key === 'props' ? value : {[key]: value};
  },
  // render:(key,value,params)=>formatData(value,params),
};

const formatValue = ({key, type, value}, params) => {
  const getType = typeValue[type];
  if (getType) {
    return getType(key, value, params);
  }
  return {[key]: value};
};

export const formatProps = (props, params) => {
  if (!props) {
    return {};
  }
  if (typeof props === 'string') {
    try {
      const value = str2code(props);
      return typeof value === 'function' ? value(params) : value;
    } catch (error) {
      return props;
    }
  }
  props = Array.isArray(props) ? props : [props];
  const newProps = {};
  props.map((item) => formatValue(item, params)).map((prop) => Object.keys(prop).map((key) => (newProps[key] = prop[key])));
  return newProps;
};

const formatData = (schema, params) => {
  if (!schema.type) {
    const props = formatProps(schema.props, params);
    return {children: props};
    /* return {
      ...schema,
      props,
    }; */
  }
  const formatSchema = (schema, params) => {
    let {type, props, children} = schema;
    type = type || 'span';
    props = props ? formatProps(props, params) : {};
    children = Array.isArray(children) ? children.map((child) => formatSchema(child, params)) : children || props?.children || null;
    return {type, props, children};
  };
  return formatSchema(schema, params);
};

export default formatData;
