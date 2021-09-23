const os=require('os');

const getIPs=()=>{
  const interfaces=os.networkInterfaces();
  const arr=[];
  Object.keys(interfaces).map(key=>arr.push(...interfaces[key]));
  const list=arr.filter(i=>i.family==='IPv4');
  const ips=list.map(v=>`http://${v.address}`);
  return ips;
};

module.exports=getIPs;

