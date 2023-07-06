import {clone, uuidv4} from '@huxy/utils';

const chatStore = () => {
  let chatId = uuidv4();
  const store = {};
  const getData = () => clone(store[chatId]) ?? [];
  const setData = data => {
    if (!store[chatId]) {
      store[chatId] = [];
    }
    data = clone(data);
    const target = store[chatId].find(({time}) => time === data.time);
    if (target) {
      target.content = data.content;
    } else {
      store[chatId].push(data);
    }
  };
  const resetData = () => {
    chatId = uuidv4();
    store[chatId] = [];
  };
  return {getData, setData, resetData};
};

export default chatStore;
