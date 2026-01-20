const {browserRouter, basepath, PROXY, buildTime, isDev, ...rest} = process.env.configs ?? {};

export {browserRouter, basepath, PROXY, buildTime, isDev};

export const defProject = rest;
