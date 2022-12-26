import {createStore} from '@huxy/utils';
import {fakeFetch} from './utils';
import {messages} from './data';

const store = createStore();

store.setState({messages});

export const markActived = async ({ids}) => {
  const res = await fakeFetch();
  const messages = store.getState('messages');
  (ids || []).map(id => {
    const item = messages.find(item => item._id === id);
    if (item) {
      item.active = 1;
    }
  });
  store.setState({messages});
  return {
    ...res,
    result: messages,
  };
};

export const listMessage = async ({active, current, size, name, role}) => {
  const res = await fakeFetch();
  const messages = store.getState('messages');
  const index = size * (current - 1);
  let temp = [];
  if (active != null) {
    temp = messages.filter(item => item.active == active);
  } else {
    temp = [...messages];
  }
  if (role != null) {
    temp = temp.filter(item => item.role === role);
  }
  if (name) {
    const reg = new RegExp(name, 'gi');
    temp = temp.filter(item => item.name.toString().match(reg));
  }
  const list = temp.slice(index, index + size);
  return {
    ...res,
    result: {
      current,
      size,
      total: temp.length,
      list,
    },
  };
};
