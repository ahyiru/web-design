// const contextRequire = require.context('@app/doc', true, /^\.\/(.+)\.md$/);

const contextRequire = import.meta.webpackContext('../../../../../doc', {
  recursive: true,
  regExp: /^\.\/(.+)\.md$/,
});

const listFiles = async () => await contextRequire.keys().map(name => ({name: name.replace(/^\.\/(.+)\.md$/, '$1')}));

const getFileMenu = list => {
  const newArr = [];
  list.map(item => {
    const fileList = item.name.split('/');
    const folder = fileList[0];
    const name = fileList[1];
    const hasFolder = newArr.find(item => item.name === folder);
    if (!hasFolder) {
      newArr.push({
        name: folder,
        children: [{name, folder}],
      });
    } else {
      hasFolder.children.push({name, folder});
    }
  });
  return newArr;
};

export default async () => getFileMenu(await listFiles());
