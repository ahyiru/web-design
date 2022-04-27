import {uuidv4,randNum,randTrue} from '@huxy/utils';

const userSchema = {
  name: 'demo',
  email: 'demo@gmail.com',
  password: '123456',
  role: 2,
  token: uuidv4(),
  projectName: 'demo',
  projectId: 'demo-1',
  description: 'demo',
  active: 1,
  createtime: +new Date(),
  updatetime: +new Date(),
  creator: 'huy',
  updater: 'huy',
  avatar: 'https://pic2.zhimg.com/a2e68681a006bd3e60fd5b22d51cb629_im.jpg',
  github: '',
};

export const fakeUsers = (schema, num = 10) =>
  [...Array(num)].map((item, index) => ({...schema, _id: uuidv4(), name: `${schema.name}-${index + 1}`, email: `${schema.name}${index + 1}@gmail.com`, role: randNum(5), active: randTrue()}));

export const users = fakeUsers(userSchema, 800);
