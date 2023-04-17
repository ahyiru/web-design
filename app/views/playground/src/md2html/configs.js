const contextRequire = import.meta.webpackContext('../../../../doc', {
  recursive: true,
  regExp: /^\.\/(.+)\.md$/,
});

export const listFiles = async () => await contextRequire.keys().map(name => ({name: name.replace(/^\.\/(.+)\.md$/, '$1')}));

export const getContext = async ({folder, name, type = ''}) => (await import(`@app/doc/${folder}/${name}${type}`))?.default;