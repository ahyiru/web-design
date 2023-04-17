import {sleep, uuidv4} from '@huxy/utils';

export const fakeFetch = async params => {
  await sleep();
  return {
    code: 200,
    message: 'success！',
    result: {},
  };
};

export const fakeList = (schema, num = 10) => [...Array(num)].map((item, index) => ({id: uuidv4(), ...schema}));
