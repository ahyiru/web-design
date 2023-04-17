const {browserRouter, basepath, PROXY, buildTime, ...rest} = process.env.configs ?? {};

export {browserRouter, basepath, PROXY, buildTime};

export const defProject = rest;
