import {useState, useEffect} from 'react';
import Input from '@app/components/base/input';
import TextArea from '@app/components/base/textarea';

import apis from './getApis';

const FileInput = ({path, getModalInputVaule}) => {
  const [content, setContent] = useState('');
  useEffect(() => {
    const getData = async () => {
      let value = '';
      try {
        const {result} = await apis.openfileFn({path});
        value = result.data ?? '';
        setContent(value);
      } catch (err) {
        console.error(err.message);
      }
      getModalInputVaule({value});
      // modalInputVaule.current.value = value;
    };
    getData();
  }, []);
  const handleChange = e => {
    const {value} = e.target;
    setContent(value);
    getModalInputVaule({value});
    // modalInputVaule.current.value = value;
  };
  return (
    <div>
      <Input value={path} disabled />
      <TextArea autoFocus value={content} onChange={handleChange} placeholder="请输入内容" row={8} style={{marginTop: '1.3rem', minHeight: '20rem'}} />
    </div>
  );
};

export default FileInput;
