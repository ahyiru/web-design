const os = require('os');

const getIPs = secure => {
  const protocol = secure ? 'https' : 'http';
  const interfaces = os.networkInterfaces();
  const arr = [];
  Object.keys(interfaces).map(key => arr.push(...interfaces[key]));
  const list = arr.filter(i => i.family === 'IPv4');
  const ips = list.map(v => `${protocol}://${v.address}`);
  return ips;
};

module.exports = getIPs;
