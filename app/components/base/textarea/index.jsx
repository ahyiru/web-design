import {useState, useEffect} from 'react';
import {message} from '@huxy/utils';
import * as styles from './index.less';

const minmaxRule = (value, min, max) => {
  if (min != null) {
    if (value < min) {
      return {
        val: min,
        msg: `最小值为 ${min}`,
      };
    }
  }
  if (max != null) {
    if (value > max) {
      return {
        val: max,
        msg: `最大值为 ${max}`,
      };
    }
  }
  return false;
};

const TextArea = ({className, value, onChange, onBlur, ...rest}) => {
  const [val, setVal] = useState(value);
  const cls = ['h-textarea', ...(className?.split(' ') ?? [])]
    .filter(Boolean)
    .map(c => styles[c])
    .join(' ');
  useEffect(() => {
    setVal(value);
  }, [value]);
  const handleChange = e => {
    e.stopPropagation();
    const {value} = e.target;
    setVal(value);
    const {min, max} = rest;
    const hasError = minmaxRule(value, min, max);
    if (!hasError) {
      onChange?.(e, value);
    }
  };
  const handleBlur = e => {
    e.stopPropagation();
    const {value} = e.target;
    const {min, max} = rest;
    const hasError = minmaxRule(value, min, max);
    if (hasError) {
      const {val, msg} = hasError;
      message.warn(msg);
      setVal(val);
      setTimeout(() => onChange?.(e, val));
    }
  };
  return <textarea className={cls} aria-label="huxy-label" row="3" {...rest} value={val ?? ''} onChange={handleChange} onBlur={handleBlur} />;
};

export default TextArea;
