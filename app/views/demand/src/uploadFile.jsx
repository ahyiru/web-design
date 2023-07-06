import {Upload} from 'antd';
import {message} from '@huxy/utils';

const UploadFile = ({getFiles, fileInfo = {}, children, ...rest}) => {
  const beforeUpload = file => {
    const {formats, maxSize} = fileInfo;
    const type = file.type.split('/')[1];
    if (!formats.includes(type)) {
      message.error(`只允许上传 .${formats.join(' .')} 格式`);
      return Upload.LIST_IGNORE;
    }
    if (file.size > maxSize) {
      message.error(`文件大小应小于 ${maxSize / 1024 / 1024}MB!`);
      return Upload.LIST_IGNORE;
    }
    getFiles?.(file);
    return false;
  };

  return (
    <Upload name="uploadfile" maxCount={1} beforeUpload={beforeUpload} {...rest}>
      {children}
    </Upload>
  );
};

export default UploadFile;
