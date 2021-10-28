import {browserRouter} from '@app/configs';
import apiList from '@app/utils/getApis';
import defProject from '@app/configs/projects';

const pageSchema=async ({id})=>{
  const {result}=await apiList.listSchemaFn({routerId:id,projectId:defProject._id});
  return {result};
};

export const dynamicRoutes=[
  {
    path:'/layout',
    name:'框架配置',
    icon:'LayoutOutlined',
    denied:false,
    // component:()=>import(`@app/views/layout`),
    componentPath:'/layout',
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
  {
    path:'/suspense',
    name:'suspense',
    icon:'CoffeeOutlined',
    denied:false,
    children:[
      /* {
        path:'/suspense',
        name:'suspense',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/suspense`),
        componentPath:'/suspense',
      }, */
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
      {
        path:'/dragable',
        name:'dragable',
        icon:'RobotOutlined',
        // component:()=>import(`@app/views/canvas/dragable`),
        componentPath:'/canvas/dragable',
      },
    ],
  },
  {
    path:'/editor',
    name:'富文本编辑器',
    icon:'EditOutlined',
    denied:false,
    // component:()=>import(`@app/views/slate/test1`),
    componentPath:'/slate/test1',
  },
  {
    path:'/page1',
    name:'一级菜单',
    icon:'RobotOutlined',
    denied:false,
    children:[
      {
        path:'/page1-1',
        name:'二级菜单1',
        icon:'RobotOutlined',
        componentPath:'/page',
      },
      {
        path:'/page1-2',
        name:'二级菜单2',
        icon:'RobotOutlined',
        children:[
          {
            path:'/page1-2-1',
            name:'三级菜单1',
            icon:'RobotOutlined',
            componentPath:'/page',
          },
          {
            path:'/page1-2-2',
            name:'三级菜单2',
            icon:'RobotOutlined',
            children:[
              {
                path:'/page1-2-2-1',
                name:'四级菜单1',
                icon:'RobotOutlined',
                componentPath:'/page',
              },
              {
                path:'/page1-2-2-2',
                name:'四级菜单1-disabled',
                icon:'RobotOutlined',
                componentPath:'/page',
                linkProps:{
                  disabled:true,
                },
              },
              {
                path:'/page1-2-2-3',
                name:'四级菜单3-_blank',
                icon:'RobotOutlined',
                componentPath:'/page',
                linkProps:{
                  target:'_blank',
                },
              },
            ],
          },
        ],
      },
      {
        path:'/page1-3',
        name:'二级菜单3',
        icon:'RobotOutlined',
        componentPath:'/page',
      },
    ],
  },
];



