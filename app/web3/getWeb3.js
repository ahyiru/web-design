import Web3 from 'web3';

// import ihuxy from './contracts/ihuxy.json';

import {CONTACT_ADDRESS, CONTACT_ABI} from './config';

export const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // window.addEventListener('load', async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable();
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    } else if (window.web3) {
      const web3 = window.web3;
      resolve(web3);
    } else {
      try {
        const provider = new Web3.providers.HttpProvider('http://ihuxy.com');
        const web3 = new Web3(provider);
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    // });
  });

const init = async () => {
  try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    // const networkId = await web3.eth.net.getId();
    // const deployedNetwork = ihuxy.networks[networkId];
    // const CONTACT_ADDRESS = deployedNetwork && deployedNetwork.address;
    // const CONTACT_ABI = ihuxy.abi;
    const contract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
    return {web3, accounts, contract};
  } catch (error) {
    throw Error(error.message);
  }
};

export default init;
