import {useState, useEffect} from 'react';
import Input from '@app/components/base/input';
import TextArea from '@app/components/base/textarea';

import apis from './getApis';

const FileInput = ({path, modalInputVaule}) => {
  const [content, setContent] = useState('');
  modalInputVaule.current = {value: content};
  useEffect(() => {
    const getData = async () => {
      const {result} = await apis.openfileFn({path});
      setContent(result.data);
      modalInputVaule.current.value = result.data;
    };
    getData();
  }, []);
  const handleChange = e => {
    const {value} = e.target;
    setContent(value);
    modalInputVaule.current.value = value;
  };
  return <div>
    <Input value={path} disabled />
    <TextArea autoFocus value={content} onChange={handleChange} placeholder="请输入内容" row={8} style={{marginTop: '1.3rem', minHeight: '20rem'}} />
  </div>;
};

export default FileInput;
