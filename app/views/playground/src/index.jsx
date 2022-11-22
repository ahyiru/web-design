import {useState, useEffect} from 'react';
import {Light} from '@huxy/materials';
import './index.less';

const Index = props => {
  const [value, setValue] = useState(1);
  useEffect(() => {
    document.documentElement.style.setProperty('--test-taiji-rotate', `${value * 360 + 90}deg`);
  }, [value]);
  return (
    <div className="demo-page-container">
      <div className="cylinder" />
      <Light />
    </div>
  );
};

export default Index;
