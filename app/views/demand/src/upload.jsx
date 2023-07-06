import {Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import UploadFile from './uploadFile';
import {fileInfo} from './uploadInfo';

const Upload = props => {
  return (
    <UploadFile fileInfo={fileInfo} {...props}>
      <Button icon={<UploadOutlined />}>点击上传</Button>
    </UploadFile>
  );
};

export default Upload;
