import str2code from 'ihuxy-utils/str2code';
import matchedStr from 'ihuxy-utils/matchedStr';
import isObject from 'ihuxy-utils/isObject';
import {formatTime} from 'ihuxy-utils/formatTime';

window.utils={formatTime};

export const formatProps = (props, params) => {
  const matched = matchedStr(props || {});
  if (matched) {
    try {
      const value = str2code(matched);
      return typeof value === 'function' ? value(params) : value;
    } catch (error) {
      return props;
    }
  }
  if (isObject(props)) {
    let newProps = {};
    Object.keys(props).map((key) => {
      const value = formatProps(props[key], params);
      if (key === '@rest') {
        newProps = {...newProps, ...value};
      } else {
        newProps[key] = value;
      }
    });
    return newProps;
  }
  return props;
};

export const formatChildren = (children, params) => {
  const matched = matchedStr(children || '');
  if (matched) {
    try {
      const value = str2code(matched);
      return typeof value === 'function' ? value(params) : value;
    } catch (error) {
      return children;
    }
  }
  return children;
};
