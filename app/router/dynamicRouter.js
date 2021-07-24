import {browserRouter} from '@app/configs';
import apiList from '@app/utils/getApis';
import defProject from '@app/configs/projects';

const pageSchema=async ({id})=>{
  const {result}=await apiList.listSchemaFn({routerId:id,projectId:defProject._id});
  return {result};
};

const routers=[
  {
    path:'/layout',
    name:'框架配置',
    icon:'LayoutOutlined',
    denied:false,
    // component:()=>import(`@app/views/layout`),
    componentPath:'/layout',
  },
  {
    path:'/projects',
    name:'项目管理',
    icon:'ConsoleSqlOutlined',
    denied:false,
    // component:()=>import(`@app/views/projects`),
    componentPath:'/projects',
  },
  {
    path:'/projects/add',
    name:'添加项目',
    hideMenu:true,
    denied:false,
    // component:()=>import(`@app/views/projects/add`),
    componentPath:'/projects/add',
  },
  {
    path:'/projects/edit/:projectId',
    name:'编辑项目',
    denied:false,
    // component:()=>import(`@app/views/projects/add`),
    componentPath:'/projects/add',
  },
  {
    path:'/projects/router/:projectId',
    name:'项目路由设置',
    denied:false,
    // component:()=>import(`@app/views/projects/router`),
    componentPath:'/projects/router',
  },
  {
    path:'/projects/router/:projectId/:routerId',
    name:'页面设计',
    denied:false,
    // component:()=>import(`@app/views/projects/router`),
    componentPath:'/projects/router/design',
  },
  {
    path:'/projects/router/:projectId/:routerId/preview',
    name:'预览',
    denied:false,
    componentPath:'/projects/router/design/preview',
  },
  {
    path:'/projects/api/:projectId',
    name:'项目接口管理',
    denied:false,
    // component:()=>import(`@app/views/projects/apis`),
    componentPath:'/projects/apis',
  },
  {
    path:'/projects/api/:projectId/add',
    name:'添加接口',
    denied:false,
    // component:()=>import(`@app/views/projects/apis/add`),
    componentPath:'/projects/apis/add',
  },
  {
    path:'/projects/api/:projectId/edit/:id',
    name:'编辑接口',
    denied:false,
    // component:()=>import(`@app/views/projects/apis/add`),
    componentPath:'/projects/apis/add',
  },
  {
    path:'/projects/api/:projectId/test/:id',
    name:'接口测试',
    denied:false,
    // component:()=>import(`@app/views/projects/apis/test`),
    componentPath:'/projects/apis/test',
  },
  {
    path:'/users',
    name:'用户管理',
    icon:'UsergroupAddOutlined',
    // denied:false,
    // component:()=>import(`@app/views/users`),
    componentPath:'/users',
  },
  /* {
    path:'/users/details/:id',
    name:'用户详情',
    component:()=>import(`@app/views/users/details`),
  }, */
  {
    path:'/users/add',
    name:'添加用户',
    hideMenu:true,
    // denied:false,
    // component:()=>import(`@app/views/users/add`),
    componentPath:'/users/add',
  },
  {
    path:'/users/edit/:id',
    name:'编辑用户',
    // denied:false,
    // component:()=>import(`@app/views/users/add`),
    componentPath:'/users/add',
  },
  {
    path:'/users/auth/:id',
    name:'路由权限设置',
    // denied:false,
    // component:()=>import(`@app/views/users/auth`),
    componentPath:'/users/auth',
  },
  {
    path:'/profile',
    name:'个人中心',
    title:'个人中心',
    hideMenu:true,
    denied:false,
    // component:()=>import(`@app/views/users/profile`),
    componentPath:'/users/profile',
  },
  /* {
    path:'/routers',
    name:'路由管理',
    icon:'ControlOutlined',
    // component:()=>import(`@app/views/routers`),
    componentPath:'/routers',
  }, */
  {
    path:'/apis',
    name:'接口管理',
    icon:'ClusterOutlined',
    // component:()=>import(`@app/views/projects/apis`),
    componentPath:'/projects/apis',
  },
  {
    path:'/apis/add',
    name:'添加接口',
    hideMenu:true,
    // denied:false,
    // component:()=>import(`@app/views/projects/apis/add`),
    componentPath:'/projects/apis/add',
  },
  {
    path:'/apis/edit/:id',
    name:'编辑接口',
    // denied:false,
    // component:()=>import(`@app/views/projects/apis/add`),
    componentPath:'/projects/apis/add',
  },
  {
    path:'/apis/test/:id',
    name:'接口测试',
    // denied:false,
    // component:()=>import(`@app/views/projects/apis/test`),
    componentPath:'/projects/apis/test',
  },
  {
    path:'/low-code',
    name:'低代码',
    icon:'CoffeeOutlined',
    denied:false,
    children:[
      {
        path:'/dom',
        name:'原生dom',
        icon:'CodeOutlined',
        componentPath:'/lowCode',
        loadData:{
          pageSchema,
        },
      },
      {
        path:'/ui',
        name:'UI组件',
        icon:'CodeOutlined',
        componentPath:'/lowCode',
        loadData:{
          pageSchema,
        },
      },
      {
        path:'/users',
        name:'业务组件',
        icon:'CodeOutlined',
        componentPath:'/lowCode',
        loadData:{
          pageSchema,
        },
      },
      {
        path:'/users/add',
        name:'新增用户',
        componentPath:'/lowCode',
        hideMenu:true,
        loadData:{
          pageSchema,
        },
      },
      {
        path:'/users/edit/:id',
        name:'编辑用户',
        componentPath:'/lowCode',
        loadData:{
          pageSchema,
        },
      },
    ],
  },
  /* {
    path:'/docs',
    name:'文档管理',
    icon:'FileMarkdownOutlined',
    // component:()=>import(`@app/views/apis`),
    componentPath:'/apis',
  },
  {
    path:'/i18n',
    name:'语言管理',
    icon:'GlobalOutlined',
    // component:()=>import(`@app/views/apis`),
    componentPath:'/apis',
  },
  {
    path:'/message',
    name:'消息管理',
    icon:'MessageOutlined',
    // component:()=>import(`@app/views/apis`),
    componentPath:'/apis',
  }, */
  {
    path:'/dashboard',
    name:'仪表盘',
    icon:'DashboardOutlined',
    denied:false,
    children:[
      {
        path:'/screen1',
        name:'screen1',
        icon:'DashboardOutlined',
        // component:()=>import(`@app/views/dashboard/screen1`),
        componentPath:'/dashboard/screen1',
      },
      {
        path:'/screen2',
        name:'screen2',
        icon:'DashboardOutlined',
        // component:()=>import(`@app/views/dashboard/screen2`),
        componentPath:'/dashboard/screen2',
      },
    ],
  },
  /* {
    path:'/pages',
    name:'页面设计',
    icon:'DesktopOutlined',
    denied:false,
    // component:()=>import(`@app/views/pages`),
    // component:()=>import(`@app/views/projects/router`),
    componentPath:'/projects/router',
  },
  {
    path:'/pages/:routerId',
    name:'页面设计',
    icon:'DesktopOutlined',
    denied:false,
    componentPath:'/projects/router/design',
  }, */
  {
    path:'/suspense',
    name:'suspense',
    icon:'CoffeeOutlined',
    denied:false,
    children:[
      {
        path:'/suspense',
        name:'suspense',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/suspense`),
        componentPath:'/suspense',
      },
      {
        path:'/errorboundary',
        name:'errorboundary',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/suspense/errorboundary`),
        componentPath:'/suspense/errorboundary',
      },
    ],
  },
  {
    path:'/canvas',
    name:'图形绘制',
    icon:'AreaChartOutlined',
    denied:false,
    children:[
      {
        path:'/canvas',
        name:'canvas',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/canvas`),
        componentPath:'/canvas',
      },
      {
        path:'/dragable',
        name:'dragable',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/canvas/dragable`),
        componentPath:'/canvas/dragable',
      },
      {
        path:'/d3',
        name:'d3',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/canvas/d3`),
        componentPath:'/canvas/d3',
      },
      {
        path:'/webgl',
        name:'webgl',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/canvas/webgl`),
        componentPath:'/canvas/webgl',
      },
    ],
  },
  /* {
    path:'/tools',
    name:'常用工具',
    icon:'ToolOutlined',
    denied:browserRouter,
    children:[
      {
        path:'/demo1',
        name:'demo1',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/tools/demo1`),
        componentPath:'/tools/demo1',
      },
      {
        path:'/demo2',
        name:'demo2',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/tools/demo2`),
        componentPath:'/tools/demo2',
      },
    ],
  }, */
  /* {
    path:'/components',
    name:'组件',
    icon:'LayoutOutlined',
    denied:false,
    children:[
      {
        path:'/table',
        name:'table',
        icon:'TableOutlined',
        componentPath:'/components',
      },
      {
        path:'/table/add',
        name:'添加用户',
        hideMenu:true,
        componentPath:'/components/add',
      },
      {
        path:'/table/edit/:id',
        name:'编辑用户',
        componentPath:'/components/add',
      },
      // {
      //   path:'/form',
      //   name:'form',
      //   icon:'ProfileOutlined',
      //   componentPath:'/components/form',
      // },
      // {
      //   path:'/tree',
      //   name:'tree',
      //   icon:'PartitionOutlined',
      //   componentPath:'/components/tree',
      // },
      // {
      //   path:'/chart',
      //   name:'chart',
      //   icon:'AreaChartOutlined',
      //   componentPath:'/components/chart',
      // },
    ],
  }, */
  {
    path:'/editor',
    name:'富文本编辑器',
    icon:'EditOutlined',
    denied:false,
    // component:()=>import(`@app/views/slate/test1`),
    componentPath:'/slate/test1',
    /* children:[
      {
        path:'/slate',
        name:'slate',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/slate`),
        componentPath:'/slate',
      },
      {
        path:'/test1',
        name:'test1',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/slate/test1`),
        componentPath:'/slate/test1',
      },
      {
        path:'/test2',
        name:'test2',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/slate/test2`),
        componentPath:'/slate/test2',
      },
      {
        path:'/test3',
        name:'test3',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/slate/test3`),
        componentPath:'/slate/test3',
      },
    ], */
  },
  {
    path:'/common',
    name:'通用页面',
    icon:'RobotOutlined',
    denied:false,
    children:[
      {
        path:'/common1',
        name:'页面1',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/projects/router`),
        componentPath:'/projects/router',
      },
      {
        path:'/common2',
        name:'页面2',
        icon:'RobotOutlined',
        children:[
          {
            path:'/common2-1',
            name:'页面2-1',
            icon:'RobotOutlined',
            // component:()=>import(`@app/views/projects/router`),
            componentPath:'/projects/router',
          },
          {
            path:'/common2-2',
            name:'页面2-2',
            icon:'RobotOutlined',
            children:[
              {
                path:'/common2-2-1',
                name:'页面2-2-1',
                icon:'RobotOutlined',
                // component:()=>import(`@app/views/projects/router`),
                componentPath:'/projects/router',
              },
              {
                path:'/common2-2-2',
                name:'页面2-2-2',
                icon:'RobotOutlined',
                // component:()=>import(`@app/views/projects/router`),
                componentPath:'/projects/router',
                linkProps:{
                  disabled:true,
                },
              },
              {
                path:'/common2-2-3',
                name:'页面2-2-3',
                icon:'RobotOutlined',
                // component:()=>import(`@app/views/projects/router`),
                componentPath:'/projects/router',
                linkProps:{
                  target:'_blank',
                },
              },
            ],
          },
        ],
      },
      {
        path:'/common3',
        name:'页面3',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/projects/router`),
        componentPath:'/projects/router',
      },
      {
        path:'/common4',
        name:'页面4',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/projects/router`),
        componentPath:'/projects/router',
      },
    ],
  },
  /* {
    path:'/test1',
    name:'test1',
    icon:'DashboardOutlined',
    denied:false,
    component:'test1',
  },
  {
    path:'/test2',
    name:'test2',
    icon:'DashboardOutlined',
    denied:false,
    component:'test2',
  },
  {
    path:'/test3',
    name:'test3',
    icon:'DashboardOutlined',
    denied:false,
    component:'test3',
  },
  {
    path:'/test4',
    name:'test4',
    icon:'DashboardOutlined',
    denied:false,
    component:'test4',
  }, */
];

export default routers;



