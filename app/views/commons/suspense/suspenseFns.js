import {wrapPromise,sleep} from '@huxy/utils';

const sus1 = async (params) => {
  await sleep(2500);
  return {
    code: 200,
    msg: 'success',
    result: {
      name: 'huy',
      age: 18,
    },
  };
};
export const sus2 = async (params) => {
  await sleep(4000);
  return {
    code: 200,
    msg: 'success',
    result: {
      list: [
        {
          name: 'huy',
        },
        {
          name: 'yiru',
        },
        {
          name: 'test',
        },
      ],
    },
  };
};

export const susTest1 = (params) => wrapPromise(sus1(params));

export const susTest2 = (params) => wrapPromise(sus2(params));
