import getContext from './getContext';

const imgReg = /!\[.*\]\((.*)\)/g;

const getPaths = async (defaultPaths, folder) => {
  const asyncPaths = {};
  for (let i = 0, j = defaultPaths.length; i < j; i++) {
    const defaultPath = defaultPaths[i];
    const name = defaultPath.slice(2);
    asyncPaths[defaultPath] = await getContext({folder, name});
  }
  return asyncPaths;
};

const replacePath = async (context, {folder}) => {
  const src = [...context.matchAll(imgReg)].filter(Boolean);
  const defaultPaths = src.map(item => item[1]);
  if (defaultPaths?.length) {
    const asyncPaths = await getPaths(defaultPaths, folder);
    defaultPaths.map(defaultPath => {
      context = context.replace(defaultPath, asyncPaths[defaultPath]);
    });
  }
  return context;
};

export default replacePath;
