import {useState, useEffect} from 'react';
import Input from '@app/components/base/input';

const FilePath = ({filename, pattern, getModalInputVaule}) => {
  const [name, setName] = useState(filename);
  useEffect(() => {
    // modalInputVaule.current = {...pattern, value: name};
    getModalInputVaule({...pattern, value: name});
  }, []);
  const handleChange = e => {
    const {value} = e.target;
    setName(value);
    // modalInputVaule.current.value = value;
    getModalInputVaule({...pattern, value});
  };
  return <Input autoFocus value={name} onChange={handleChange} placeholder="请输入" />;
};

export default FilePath;
