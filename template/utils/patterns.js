// 用户名
export const namePattern={
  pattern:/^[\u4E00-\u9FA5A-Za-z0-9_]{2,20}$/,
  message:'长度为2-20不含特殊字符!',
};
// 邮箱
export const emailPattern={
  pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  message:'邮箱格式不正确!',
};
// 密码
export const passwordPattern={
  pattern:/^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z!@#$_]{8,20}$/,
  message:'密码长度为8-20个字符，并且至少包含数字、大小写字母中的两种，不含特殊字符!',
};

// 路由地址
export const pathPattern={
  pattern:/^(\/[\w#?&=:-]+)+$/,
  message:'请输入正确路径！',
};
// 版本号格式必须为X.Y.Z
export const versionPattern={
  pattern:/^\d+(?:\.\d+){2}$/,
  message:'版本号格式必须为X.Y.Z！',
};
// linux文件夹路径
export const linuxPathPattern={
  pattern:/^\/(\w+\/?)+$/,
  message:'请输入正确路径！',
};
// linux文件路径
export const linuxFilePattern={
  pattern:/^\/(\w+\/)+\w+\.\w+$/,
  message:'请输入正确路径！',
};
// window下文件夹路径
export const windowPathPattern={
  pattern:/^[a-zA-Z]:\\(?:\w+\\?)*$/,
  message:'请输入正确路径！',
};
// window下文件路径
export const windowFilePattern={
  pattern:/^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/,
  message:'请输入正确路径！',
};




