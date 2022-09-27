import {uuidv4, createStore} from '@huxy/utils';
import {fakeFetch} from './utils';
import {users, routers} from './data';

const store = createStore();

store.setState({users, routers});

export const projectList = [
  {
    _id: uuidv4(),
    name: 'demo1',
  },
  {
    _id: uuidv4(),
    name: 'demo2',
  },
];

export const login = async data => {
  const res = await fakeFetch();
  const users = store.getState('users');
  const user = users.find(item => data.name === item.name && data.password === item.password);
  return {
    ...res,
    result: user,
  };
};
export const logout = async data => {
  const res = await fakeFetch();
  return {
    ...res,
    result: true,
  };
};

export const addUser = async data => {
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

export const editUser = async data => {
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
export const deleteUser = async ({ids}) => {
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

export const allUser = async ({active, current, size, name, role}) => {
  const res = await fakeFetch();
  const users = store.getState('users');
  const index = size * (current - 1);
  let temp = [];
  if (active != null) {
    temp = users.filter(item => item.active == active);
  } else {
    temp = [...users];
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

export const getRouter = async () => {
  const res = await fakeFetch();
  const routers = store.getState('routers');
  return {
    ...res,
    result: routers,
  };
};

export const addRouter = async data => {
  const res = await fakeFetch();
  const routers = store.getState('routers');
  const item = {...data, _id: uuidv4()};
  routers.push(item);
  store.setState({routers});
  return {
    ...res,
    result: item,
  };
};

export const editRouter = async data => {
  const res = await fakeFetch();
  const routers = store.getState('routers');
  let router = routers.find(item => item._id === data._id);
  if (router) {
    router = {...router, ...data};
    store.setState({routers});
  }
  return {
    ...res,
    result: data,
  };
};

export const deleteRouter = async data => {
  const res = await fakeFetch();
  const routers = store.getState('routers');
  const routerIndex = routers.findIndex(item => item._id === data._id);
  if (routerIndex > -1) {
    routers.splice(routerIndex, 1);
    store.setState({routers});
  }
  return res;
};

export const getAuthedRouter = async () => {
  const res = await fakeFetch();
  const authedRouter = store.getState('authedRouter') || [];
  return {
    ...res,
    result: authedRouter,
  };
};

export const setAuthedRouter = async data => {
  const res = await fakeFetch();
  const authedRouter = store.getState('authedRouter') || [];
  const newList = [...new Set([...authedRouter, ...(data?.authKeys ?? [])])];
  store.setState({authedRouter: newList});
  return {
    ...res,
    result: newList,
  };
};
