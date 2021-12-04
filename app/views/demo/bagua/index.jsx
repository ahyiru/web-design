import {useState} from 'react';
import './index.less';
const bg=[
  {
    value:'一',
    label:'乾',
    yao:[1,1,1],
    position:0,
    details:'乾三连',
  },
  {
    value:'二',
    label:'兑',
    yao:[0,1,1],
    position:7,
    details:'兑上缺',
  },
  {
    value:'三',
    label:'离',
    yao:[1,0,1],
    position:6,
    details:'离中虚',
  },
  {
    value:'四',
    label:'震',
    yao:[0,0,1],
    position:5,
    details:'震仰盂',
  },
  {
    value:'五',
    label:'巽',
    yao:[1,1,0],
    position:1,
    details:'巽下断',
  },
  {
    value:'六',
    label:'坎',
    yao:[0,1,0],
    position:2,
    details:'坎中满',
  },
  {
    value:'七',
    label:'艮',
    yao:[1,0,0],
    position:3,
    details:'艮覆碗',
  },
  {
    value:'八',
    label:'坤',
    yao:[0,0,0],
    position:4,
    details:'坤六断',
  },
];
const Index=props=>{
  const [rand,setRand]=useState(0);
  return <div className="taiji-container">
    <div className="yao-gua">
      {
        bg.map(({value,label,details,yao,position})=><div key={value} className="gua" style={{transform:`rotate(${45*(position+rand)}deg)`}}>
          <p className="gua-desc">{details}</p>
          <h4 className="gua-name">{label}</h4>
          <p className="gua-desc">{value}</p>
          <div className="yao">
            {
              yao.map((item,i)=><div key={`${item}-${i}`} className={item?'yang':'yin'} />)
            }
          </div>
        </div>)
      }
      <div className="taiji" />
    </div>
    <div style={{padding:'20px 0',textAlign:'center'}}>
      <button onClick={()=>setRand(~~(Math.random()*10))}>测一测</button>
      <button onClick={()=>setRand(0)} style={{marginLeft:'12px'}}>reset</button>
    </div>
  </div>;
};

export default Index;


