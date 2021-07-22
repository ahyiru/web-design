module.exports={
  extends: 'stylelint-config-recommended',
  plugins: ['stylelint-order'],
  rules: {
    // 'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',// 规定css类名格式(此处为短横线命名法，例如：.m-title)
    'function-url-quotes':'always',// url需要加引号
    'color-hex-case':'lower',
    'string-quotes':'double',
    'selector-pseudo-class-no-unknown': [true, {
      'ignorePseudoClasses': ['global', 'export', 'import', 'local']
    }],
    "no-descending-specificity":null/* [true,{
        ignore:["selectors-within-list"],
      },
    ] */,
  },
};

