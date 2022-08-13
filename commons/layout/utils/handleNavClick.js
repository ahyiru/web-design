const handleNavClick = (props, item) => {
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
