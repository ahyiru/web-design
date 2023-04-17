import {useState} from 'react';
import Input from '@app/components/base/input';

const FilePath = ({filename, modalInputVaule, pattern}) => {
  const [value, setValue] = useState(filename);
  modalInputVaule.current = {...pattern, value};
  const handleChange = e => {
    const {value} = e.target;
    setValue(value);
    modalInputVaule.current.value = value;
  };
  return <Input autoFocus value={value} onChange={handleChange} placeholder="请输入" />;
};

export default FilePath;
