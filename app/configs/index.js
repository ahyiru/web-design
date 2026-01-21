const {browserRouter, basepath, PROXY, buildTime, ...rest} = process.env.configs ?? {};

export {browserRouter, basepath, PROXY, buildTime};

export const isDev = process.env.NODE_ENV === 'development';

export const defProject = rest;
