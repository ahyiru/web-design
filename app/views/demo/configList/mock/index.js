import {fakeFetch} from './utils';
import {users} from './data';

import {uuidv4, createStore} from '@huxy/utils';

const store = createStore();

store.setState({users});

export const addUserFn = async data => {
  const res = await fakeFetch();
  const item = {...data, _id: uuidv4()};
  const users = store.getState('users');
  users.push(item);
  store.setState({users});
  return {
    ...res,
    result: item,
  };
};

export const editUserFn = async data => {
  const res = await fakeFetch();
  const users = store.getState('users');
  let user = users.find(item => item._id === data._id);
  if (user) {
    user = {...user, ...data};
    store.setState({users});
  }
  return {
    ...res,
    result: data,
  };
};
export const deleteUserFn = async ({ids}) => {
  const res = await fakeFetch();
  const users = store.getState('users');
  (ids || []).map(id => {
    const userIndex = users.findIndex(item => item._id === id);
    if (userIndex > -1) {
      users.splice(userIndex, 1);
    }
  });
  store.setState({users});
  return res;
};

export const allUserFn = async ({active, current, size, name, role}) => {
  // console.log('params: ',active, current, size, name, role);
  const res = await fakeFetch();
  const users = store.getState('users');
  const index = size * (current - 1);
  let temp = [];
  if (active != null) {
    temp = users.filter(item => +item.active == active);
  } else {
    temp = [...users];
  }
  if (role) {
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

export const exportFn = async params => {
  const res = await fakeFetch();
  return res;
};
