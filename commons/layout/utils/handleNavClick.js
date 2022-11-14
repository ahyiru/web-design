import report from '@app/apis/report/report';

const handleNavClick = (props, item) => {
  report({
    actionType: 'click',
    category: 'navbar',
    text: item.name || item.title || item.type,
    value: item.type,
  });
  const {handle, path, link} = item;
  if (typeof handle === 'function') {
    return handle(item);
  }
  if (link) {
    return window.open(link);
  }
  if (path) {
    return props.router.push(path);
  }
};

export default handleNavClick;
