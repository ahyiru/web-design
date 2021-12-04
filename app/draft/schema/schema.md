## table

```
{
  pagination:true,
  rowSelection:true,
  actions:[
    {
      name:'',
      apiName:'',
      funcName:'',
      isBatch:true,
      isTopbar:true,
      btnProps:{
        type:'',
        text:'',
        icon:'',
      },
      handle:{
        isModal:true,
        path:'./edit',
        idKey:'_id',
        state:true,
      },
    },
  ],
  columns:[
    {
      title:'操作',
      dataIndex:'action',
      align:'center',
      ellipsis:true,
      width:'',
      render:'',
    },
  ],
}

{
  type:'Form',
  props:{
    layout:'inline',
    name:'searchForm',
  },
}

{
  type:'Form',
  props:{
    layout:'inline',
    name:'searchForm',
  },
  children:[
    {
      name:'',
      label:'',
      rules:'',
      type:'Input',
      props:{
        placeholder:'请输入',
        allowClear:true,
        style:{width:'100px'},
        getData:['options','configs.roleList'],
        type:'primary',
        htmlType:'submit',
      },
    },
  ],
}


```


