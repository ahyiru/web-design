import {useState, useEffect} from 'react';
import './index.less';

const Index = props => {
  const [value, setValue] = useState(1);
  useEffect(() => {
    document.documentElement.style.setProperty('--test-taiji-rotate', `${value * 360 + 90}deg`);
  }, [value]);
  return (
    <div className="taiji-container">
      <div className="yao-gua">
        <div className="taiji" />
      </div>
      <div style={{padding: '20px 0', textAlign: 'center'}}>
        <input type="number" min="1" max="360" value={value} onChange={e => setValue(e.target.value)} />
      </div>
    </div>
  );
};

export default Index;
