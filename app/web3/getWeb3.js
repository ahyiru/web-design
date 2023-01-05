// import ihuxy from './contracts/ihuxy.json';

import {CONTACT_ADDRESS, CONTACT_ABI} from './config';

export const getWeb3 = async () => {
  let Web3 = await import('web3');
  Web3 = Web3.default ?? Web3;
  if (window.ethereum) {
    await window.ethereum.request({method: 'eth_requestAccounts'});
    return new Web3(window.ethereum);
  } else if (window.web3) {
    return window.web3;
  } else {
    const provider = new Web3.providers.HttpProvider('http://ihuxy.com');
    return new Web3(provider);
  }
};

const init = async () => {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  // const networkId = await web3.eth.net.getId();
  // const deployedNetwork = ihuxy.networks[networkId];
  // const CONTACT_ADDRESS = deployedNetwork && deployedNetwork.address;
  // const CONTACT_ABI = ihuxy.abi;
  const contract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
  return {web3, accounts, contract};
};

export default init;
