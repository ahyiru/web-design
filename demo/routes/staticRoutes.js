/* import apiList from '@app/utils/getApis';
const pageSchema=async ({params})=>{
  const {result}=await apiList.listSchemaFn(params);
  return {result};
}; */
const routes=[
  {
    path:'/',
    name:'首页',
    icon:'HomeOutlined',
    denied:false,
    component:()=>import('@common/layout'),
  },
  {
    path:'/user',
    title:'登录注册',
    icon:'TeamOutlined',
    denied:false,
    hideMenu:true,
    component:()=>import('@app/user'),
    children:[
      {
        path:'/signin',
        name:'登录',
        component:()=>import('@app/user/login'),
      },
      {
        path:'/signup',
        name:'注册',
        component:()=>import('@app/user/signup'),
      },
      {
        path:'/verifyEmail',
        name:'验证邮箱',
        component:()=>import('@app/user/verifyEmail'),
      },
      {
        path:'/setNewPwd',
        name:'重置密码',
        component:()=>import('@app/user/setNewPwd'),
      },
    ],
  },
  {
    path:'/404',
    name:'404',
    denied:false,
    component:import('@app/404'),
    hideMenu:true,
  },
];

export default routes;



