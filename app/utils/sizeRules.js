export const sizeRules = unit => {
  unit = unit === 'px' ? 'px' : 'rem';
  const b = unit === 'rem' ? 1 : 10;
  return {
    '--maxWidth': {
      // px: [800, 2000],
      [unit]: [80 * b , 200 * b],
      vw: [60, 100],
    },
    '--menuWidth': {
      // px: [100, 300],
      [unit]: [10 * b, 30 * b],
    },
    '--collapseWidth': {
      // px: [50, 100],
      [unit]: [5 * b, 10 * b],
    },
    '--collapseMenuWidth': {
      // px: [100, 300],
      [unit]: [10 * b, 30 * b],
    },
    '--headerHeight': {
      // px: [50, 100],
      [unit]: [5 * b, 10 * b],
    },
    '--footerHeight': {
      // px: [40, 100],
      [unit]: [4 * b, 10 * b],
    },
    '--breadHeight': {
      // px: [30, 80],
      [unit]: [3 * b, 8 * b],
    },
    '--menuItemHeight': {
      // px: [30, 80],
      [unit]: [3 * b, 8 * b],
    },
  };
};

export const fontSize = {
  rem: [8, 16],
};
