const permRoutes = (routers, permList, permKey = 'path', prefix = '') => {
  prefix = prefix === '/' ? '' : prefix;
  return routers.map(router => {
    const path = prefix + router[permKey];
    const isRouterDenied = router.denied != null && path !== '/';
    if (!isRouterDenied && router.children?.length) {
      router.children = permRoutes(router.children, permList, permKey, path);
    }
    // 权限控制
    // router.denied = router.denied != null ? router.denied : !permList?.includes(path);
    return router;
  });
};

export default permRoutes;
