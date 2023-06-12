const contextRequire = import.meta.webpackContext('../../../../doc', {
  recursive: true,
  regExp: /^\.\/(.+)\.md$/,
});

export const listFiles = async () => {
  const list = await contextRequire.keys().map(name => ({name: name.replace(/^\.\/(.+)\.md$/, '$1')}));
  const firstIndex = list.findIndex(({name}) => name.includes('md2html/'));
  const firstItem = list.splice(firstIndex, 1);
  return [...firstItem, ...list];
};

export const getContext = async ({folder, name, type = ''}) => (await import(`@app/doc/${folder}/${name}${type}`))?.default;