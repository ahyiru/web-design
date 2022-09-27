import { useState } from 'react';
import { message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { loadImage, loadBase64, fixSize } from '@huxy/utils';

const maxSize = 3 * 1024 * 1024;
const fileTypes = ['png', 'jpg', 'jpeg', 'webp', 'gif'].map(v => `image/${v}`);

const UploadFile = ({getFiles, ...rest}) => {
  const [imageInfo, setImageInfo] = useState({url: '', width: ''});

  const loadFile = async file => {
    const url = await loadBase64(file);
    const img = await loadImage(url);
    const width = fixSize(img);
    setImageInfo({url, width});
    getFiles?.(file);
  };

  const beforeUpload = async file => {
    if (!fileTypes.includes(file.type)) {
      message.error('Allowed only .png, .jpg, .jpeg .webp and .gif');
      return false;
    }
    if (file.size > maxSize) {
      message.error('Image must smaller than 3MB!');
      return false;
    }
    await loadFile(file);
    return true;
  };

  return <Upload
    name="screenshot"
    listType="picture-card"
    maxCount={1}
    className="screenshot-uploader"
    showUploadList={false}
    beforeUpload={beforeUpload}
    {...rest}
  >
    {
      imageInfo.url ? <img src={imageInfo.url} alt="screenshot" style={{width: imageInfo.width}} />
        : <div>
          <PlusOutlined />
          <div style={{marginTop: 8}}>Upload</div>
        </div>
    }
  </Upload>;
};

export default UploadFile;