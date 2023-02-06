const sizes = {
  '--maxWidth': '100vw',
  '--menuWidth': '220px',
  '--collapseWidth': '68px',
  '--collapseMenuWidth': '180px',
  '--headerHeight': '60px',
  '--footerHeight': '50px',
  '--breadHeight': '50px',
  '--menuItemHeight': '48px',
};
const color1 = {
  '--appColor': '#859abd',
  '--appBgColor': '#243550',
  '--bannerBgColor': '#334a60',
  '--navBgColor': '#243550',
  '--menuBgColor': '#334a60',
  '--panelBgColor': '#334a60',
  '--linkColor': '#859abd',
  '--linkHoverColor': '#ffffff',
  '--linkActiveColor': '#ffffff',
  '--bannerLinkColor': '#ffffff',
  '--borderColor': '#859abd',
};
const color2 = {
  '--appColor': '#24312b',
  '--appBgColor': '#f9f7f2',
  '--bannerBgColor': '#01170e',
  '--navBgColor': '#ffffff',
  '--menuBgColor': '#01170e',
  '--panelBgColor': '#ffffff',
  '--linkColor': '#24312b',
  '--linkHoverColor': '#dc6962',
  '--linkActiveColor': '#dc6962',
  '--bannerLinkColor': '#fbfbfb',
  '--asideLinkColor': '#f2f2f2',
  '--borderColor': '#ebeef5',
};
const color3 = {
  '--appColor': '#334a60',
  '--appBgColor': '#f2f2f2',
  '--bannerBgColor': '#e6e5f2',
  '--navBgColor': '#ffffff',
  '--menuBgColor': 'linear-gradient(to bottom, #e6e5f2, #4599cd)',
  '--panelBgColor': '#ffffff',
  '--linkColor': '#334a60',
  '--linkHoverColor': '#ab47bc',
  '--linkActiveColor': '#bc5090',
  '--borderColor': '#ebeef5',
};
const color4 = {
  '--appColor': '#21364a',
  '--appBgColor': '#c5cae9',
  '--bannerBgColor': '#e6e5f2',
  '--navBgColor': 'linear-gradient(to right,#4568dc, #b06ab3)',
  '--menuBgColor': 'linear-gradient(to bottom,#e6e5f2, #4599cd)',
  '--panelBgColor': 'linear-gradient(to right,#beb9db, #7eb0d5)',
  '--linkColor': '#21364a',
  '--linkHoverColor': '#fb8c00',
  '--linkActiveColor': '#fb8c00',
  '--headerLinkColor': '#fcfcfc',
  '--borderColor': 'rgba(0, 0, 0, 0.12)',
};

const theme1 = {sizes, colors: color1};
const theme2 = {sizes, colors: color2};
const theme3 = {sizes, colors: color3};
const theme4 = {sizes, colors: color4};

export {
  theme1,
  theme2,
  theme3,
  theme4,
};
