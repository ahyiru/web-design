const os=require('os');

const getIPs=()=>{
  const interfaces=os.networkInterfaces();
  const lo0=interfaces.lo0||[];
  const en0=interfaces.en0||[];
  const localIp=lo0.filter(i=>i.family==='IPv4').map(v=>`http://${v.address}`);
  const serverIp=en0.filter(i=>i.family==='IPv4').map(v=>`http://${v.address}`);
  return [...localIp,...serverIp];
};

module.exports=getIPs;

