const layout = {
  saveConfig: '保存配置',
  copyConfig: '拷贝配置',
  hideHeader: '隐藏头部栏',
  hidden: '隐藏',
  menuType: '菜单类型',
  vertical: '纵向',
  horizontal: '横向',
  compose: '组合',
  themes: '主题',
  frameSize: '框架大小',
  fontSize: '字体大小',
  layoutDesign: '布局',
  sizeDesign: '大小',
  colorDesign: '颜色',
  save_cfg_msg: '主题保存成功！',
  copy_cfg_msg: '主题拷贝成功！',
  data_valid_msg: '请输入合法数据！',
  data_px_msg: '请输入500-5000内数据！',
  data_percent_msg: '请输入50-100内数据！',
  menu_width_msg: '请输入0-300内数据！',
};

const tables = {
  add: '添加',
  batchDelete: '批量删除',
  search: '查询',
  reset: '重置',
  edit: '编辑',
  delete: '删除',
  cancel: '取消',
  submit: '确定',
  delMsg: '确定删除吗？',
};

const projects = {
  tableHeaderText: {
    name: '项目名',
    description: '项目描述',
    role: '项目等级',
    target: '接口前缀',
    updatetime: '更新时间',
    updater: '更新人',
    action: '操作',
  },
  actionsText: {
    router_action: '路由配置',
    api_action: '接口管理',
    edit_action: '编辑',
    delete_action: '删除',
    delete_confirm: '确定删除吗？',
    delete_confirm_ok: '删除',
    delete_confirm_cancel: '取消',
    add_action: '新增',
    batch_action: '批量删除',
  },
  searchFormText: {
    name: '项目名',
    name_placeholder: '请输入',
    submit: '查询',
  },
  addFormText: {
    name: '项目名',
    name_placeholder: '请输入',
    target: '接口前缀',
    target_placeholder: '接口前缀',
    role: '等级',
    role_placeholder: '请选择',
    description: '描述',
    description_placeholder: '描述',
    submit: '保存',
    reset: '重置',
  },
};
const projectApis = {
  tableHeaderText: {
    name: '接口名',
    tags: '标签',
    url: '地址',
    method: '请求方式',
    dataType: '参数类型',
    auth: '接口权限',
    input: '入参',
    output: '出参',
    updatetime: '更新时间',
    updater: '更新人',
    action: '操作',
  },
  actionsText: {
    test_action: '测试',
    edit_action: '编辑',
    delete_action: '删除',
    delete_confirm: '确定删除吗？',
    delete_confirm_ok: '删除',
    delete_confirm_cancel: '取消',
    add_action: '新增',
    batch_action: '批量删除',
  },
  searchFormText: {
    url: '接口地址',
    url_placeholder: '请输入',
    submit: '查询',
    reset: '重置',
  },
  addFormText: {
    name: '接口名',
    tags: '标签',
    url: '地址',
    method: '请求方式',
    dataType: '参数类型',
    auth: '接口权限',
    input: '入参',
    output: '出参',
    submit: '保存',
    reset: '重置',
    test: '测试',
  },
};
const projectRouter = {
  pageText: {
    search_placeholder: '请输入名称',
    preview_text: '页面预览',
    design_text: '页面设计',
  },
  actionsText: {
    add_action: '新增',
    edit_action: '编辑',
    delete_action: '删除',
    delete_confirm: '确定删除吗？',
    delete_confirm_ok: '删除',
    delete_confirm_cancel: '取消',
  },
  addFormText: {
    parentId: '父路径',
    path: '路径',
    name: '展示名',
    component: '页面文件路径',
    icon: '图标',
    hideMenu: '隐藏菜单',
    denied: '禁止访问',
    add_title: '新增',
    edit_title: '编辑',
    ok_text: '确定',
    cancel_text: '取消',
  },
};
const projectDesign = {
  pageText: {
    page_title: '属性配置',
  },
  actionsText: {
    add_action: '新增',
    edit_action: '编辑',
    delete_action: '删除',
    delete_confirm: '确定删除吗？',
    delete_confirm_ok: '删除',
    delete_confirm_cancel: '取消',
  },
  topActionText: {
    preview: '预览',
    saveConfigs: '保存配置',
    redoDesign: '重做',
    undoDesign: '撤销',
  },
  addFormText: {
    type: '组件',
    add_title: '新增',
    edit_title: '编辑',
    ok_text: '确定',
    cancel_text: '取消',
  },
  designConfigText: {
    actionI18n: {
      required_msg: '此项为必填项！',
      name: '事件名',
      apiName: 'api名',
      handlePath: '跳转路径',
      btnText: '按钮名',
      isBatch: '批量操作',
      is_batch_no: '否',
      is_batch_yes: '是',
      option: '操作',
      edit_action: '编辑',
      delete_action: '删除',
      delete_confirm: '确认删除？',
      table_title: '添加action',
    },
    columnI18n: {
      required_msg: '此项为必填项！',
      title: '标题',
      dataIndex: '属性名',
      align: '对齐方式',
      renderType: '渲染类型',
      renderProps: '渲染属性',
      renderChildren: '子节点',
      tools: '工具',
      option: '操作',
      edit_action: '编辑',
      delete_action: '删除',
      delete_confirm: '确认删除？',
      table_title: '添加column',
    },
    editorI18n: {
      actions: 'actions配置',
      searchForm: 'searchForm配置',
      columns: 'columns配置',
      modalForm: 'modalForm配置配置',
      required_msg: '此项为必填项！',
      name: '属性名',
      value: '属性值',
      option: '操作',
      edit_action: '编辑',
      delete_action: '删除',
      delete_confirm: '确认删除？',
      table_title: '添加属性',
    },
  },
};
const users = {
  tableHeaderText: {
    name: '用户名',
    email: '邮箱',
    active: '状态',
    active_true: '已激活',
    active_false: '未激活',
    github: 'GitHub',
    github_true: '已绑定',
    github_false: '未绑定',
    projectName: '所在项目',
    role: '等级',
    updatetime: '更新时间',
    updater: '更新人',
    action: '操作',
  },
  actionsText: {
    auth_action: '设置权限',
    edit_action: '编辑',
    delete_action: '删除',
    delete_confirm: '确定删除吗？',
    delete_confirm_ok: '删除',
    delete_confirm_cancel: '取消',
    add_action: '新增',
    batch_action: '批量删除',
  },
  searchFormText: {
    name: '用户名',
    name_placeholder: '请输入',
    role: '等级',
    role_placeholder: '请选择',
    submit: '查询',
    reset: '重置',
  },
  addFormText: {
    name: '用户名',
    email: '邮箱',
    password: '密码',
    role: '等级',
    avatar: '头像',
    projectId: '所在项目',
    submit: '保存',
    reset: '重置',
  },
  authFormText: {
    root_name: '路由权限设置',
    auth_msg: '请刷新页面查看当前路由状态是否生效！',
    submit: '保存',
    reset: '清空',
  },
  profilePageText: {
    profile: {
      title: '个人信息',
      name: '用户名',
      email: '邮箱',
      active: '状态',
      active_true: '已激活',
      active_false: '未激活',
      projectName: '所在项目',
      role: '等级',
    },
    upProfile: {
      title: '更新信息',
      name: '用户名',
      email: '邮箱',
      password: '密码',
      submit: '确认修改',
      reset: '清空',
    },
  },
};
const suspense = {
  columns_title: '姓名',
  columns_email: '邮箱',
  test1_title: '个人信息',
  test2_title: '用户信息',
  loadError: 'loadError',
  errorBoundary: 'errorBoundary',
  handleErrorBoundary: 'handleErrorBoundary',
  handleError: 'handleError',
};
const canvas = {
  red_pen: '红色画笔',
  blue_pen: '蓝色画笔',
  green_pen: '绿色画笔',
  orange_pen: '橙色画笔',
  small_pen: '小',
  middle_pen: '中',
  large_pen: '大',
  add_text: '添加文本',
  eraser: '橡皮擦',
  undo: '撤回',
  redo: '重做',
  clean_canvas: '清除画布',
  save_canvas: '保存画布',
  replace_pic: '替换背景',
  clean_pic: '清除背景图',
  up_image_msg: '请上传图片！',
  up_image_size_msg: '图片大小不能超过8MB！',
};
const editor = {
  undo: '撤回',
  redo: '重做',
  h1: '标题H1',
  h2: '标题H2',
  ol: '有序列表',
  ul: '无序列表',
  bold: '加粗',
  italic: '斜体',
  underline: '下划线',
  strikethrough: '删除线',
  fontSize: '字体大小',
  color: '字体颜色',
  background: '背景颜色',
  quote: '引用',
  dividing: '分割线',
  alignCenter: '居中',
  alignLeft: '左对齐',
  alignRight: '右对齐',
  indent: '缩进',
  lineHeight: '行间距',
  spacing: '字体间距',
  clear: '清除格式',
  brush: '格式刷',
  code: '代码块',
  table: '表格',
  emoji: '表情',
  latex: '公式',
  file: '附件',
  flow: '流程图',
  image: '图片',
  video: '视频',
  audio: '音频',
  link: '超链接',
  markdown: 'markdown',
  import: '文档导入',
};

const components = {
  back: '返回',
};

const main = {
  bread: '当前位置',
  layout,
  tables,
  projects,
  projectApis,
  projectRouter,
  projectDesign,
  users,
  suspense,
  canvas,
  editor,
  components,
};

export default main;
