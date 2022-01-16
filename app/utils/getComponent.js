const getComponent = (item) => {
  const {path} = item;
  if (path === '/') {
    item.component = () => import('@common/layout');
    return item;
  }
  if (path === '/404') {
    item.component = () => import('@app/404');
    return item;
  }
  const component = item.component ?? path;
  if (component.indexOf('/user/') === 0) {
    item.component = () => import(`@app/user${component}`);
    return item;
  }
  item.component = component ? () => import(`@app/views${component}`) : null;
  return item;
};

export default getComponent;
