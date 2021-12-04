const searchSchema={
  type:'Form',
  props:{
    layout:'inline',
    name:'searchForm',
  },
  children:[
    {
      type:'Item',
      props:{
        name:'name',
        label:'用户名',
        rules:'',
      },
      children:[
        {
          type:'Input',
          props:{
            placeholder:'请输入',
            allowClear:true,
            style:`{{width:'120px'}}`,
          },
        },
      ],
    },
    {
      type:'Item',
      props:{
        name:'role',
        label:'等级',
        rules:'',
      },
      children:[
        {
          type:'Select',
          props:{
            placeholder:'请选择',
            allowClear:true,
            options:`{configs.roleList}`,
            style:`{{width:'100px'}}`,
          },
        },
      ],
    },
    {
      type:'Item',
      props:{},
      children:[
        {
          type:'Button',
          props:{
            loading:`{self=>self.loading}`,
            type:'primary',
            htmlType:'submit',
            children:'查询',
          },
        },
        {
          type:'Button',
          props:{
            style:`{{marginLeft:'12px'}}`,
            onClick:`{self=>self.resetFields}`,
            children:'重置',
          },
        },
      ],
    },
  ],
};
const modalSchema={
  type:'Form',
  props:{
    '@rest':'{configs.layout}',
    name:'modalForm',
  },
  children:[
    {
      type:'Item',
      props:{
        name:'name',
        label:'用户名',
        rules:'{self=>self.rules.nameRule}',
      },
      children:[
        {
          type:'Input',
          props:{
            placeholder:'用户名',
            allowClear:true,
          },
        },
      ],
    },
    {
      type:'Item',
      props:{
        name:'email',
        label:'邮箱',
        rules:'{self=>self.rules.emailRule}',
      },
      children:[
        {
          type:'Input',
          props:{
            placeholder:'邮箱',
            allowClear:true,
          },
        },
      ],
    },
    {
      type:'Item',
      props:{
        name:'password',
        label:'密码',
        rules:'{self=>self.rules.passwordRule}',
      },
      children:[
        {
          type:'Input',
          props:{
            placeholder:'密码',
            allowClear:true,
            type:'password',
          },
        },
      ],
    },
    {
      type:'Item',
      props:{
        name:'role',
        label:'等级',
        rules:'',
      },
      children:[
        {
          type:'Select',
          props:{
            placeholder:'请选择',
            allowClear:true,
            options:'{configs.roleList}',
          },
        },
      ],
    },
    {
      type:'Item',
      props:{
        name:'avatar',
        label:'头像',
        rules:'',
      },
      children:[
        {
          type:'Input',
          props:{
            placeholder:'头像',
            allowClear:true,
          },
        },
      ],
    },
  ],
};
const tableSchema={
  actions:[
    {
      name:'listFn',
      apiName:'allUserFn',
    },
    {
      name:'addFn',
      apiName:'addUserFn',
      // handleName:'handleAdd',
      btnText:'新增',
    },
    {
      name:'editFn',
      // handleName:'handleEdit',
      apiName:'editUserFn',
    },
    {
      name:'deleteFn',
      // handleName:'handleDelete',
      apiName:'deleteUserFn',
      btnText:'批量删除',
      isBatch:true,
    },
  ],
  columns:[
    {
      title:'用户名',
      dataIndex:'name',
      render:{
        type:'a',
        props:`{({text,record,index,actions})=>{
          return {
            onClick:e=>actions['handleCheck'](record),
          };
        }}`,
        children:`{({text})=>text}`,
      },
      /* render:`{
        ({text,record,index,actions})=>{
          return <a onClick={e=>actions['handleCheck'](record)}>{text}</a>;
        };
      }`, */
    },
    {
      title:'邮箱',
      dataIndex:'email',
      render:{
        children:`{({text,record,index})=>text.replace(/\\S+(@\\S+)/,'*****$1')}`,
      },
      /* render:`{
        ({text,record,index})=>text.replace(/\\S+(@\\S+)/,'*****$1');
      }`, */
    },
    {
      title:'状态',
      dataIndex:'active',
      render:{
        type:'Tag',
        props:`{({text,record,index})=>{
          const color=text?'green':'red';
          return {
            color,
          };
        }}`,
        children:`{({text,record,index})=>text?'已激活':'未激活'}`,
      },
      /* render:`{
        ({text,record,index})=>{
          const color=text?'green':'red';
          return <Tag color={color}>{text?'已激活':'未激活'}</Tag>
        };
      }`, */
    },
    {
      title:'是否绑定GitHub',
      dataIndex:'github',
      render:{
        type:'Tag',
        props:`{({text,record,index})=>{
          const color=text?'green':'red';
          return {
            color,
          };
        }}`,
        children:`{({text,record,index})=>text?'已激活':'未激活'}`,
      },
      /* render:`{
        ({text,record,index})=>{
          const color=text?'green':'red';
          return <Tag color={color}>{text?'已绑定':'未绑定'}</Tag>
        };
      }`, */
    },
    {
      title:'所在项目',
      dataIndex:'projectName',
    },
    {
      title:'等级',
      dataIndex:'role',
      render:{
        children:`{({text,record,index})=>configs['roleList'].find(v=>v.value===text)?.label??'-'}`,
      },
      /* render:`{
        ({text,record,index})=>configs['roleList'].find(v=>v.value===text)?.label??'-';
      }`, */
    },
    {
      title:'更新时间',
      dataIndex:'updatetime',
      render:{
        children:`{({text,record,index})=>{
          const time=text||record.createtime||record.signuptime||+new Date();
          return utils['formatTime'](new Date(time));
        }}`,
      },
      /* render:`{
        ({text,record,index})=>{
          const time=text||record.createtime||record.signuptime||+new Date();
          return utils['formatTime'](new Date(time));
        };
      }`, */
    },
    {
      title:'更新人',
      dataIndex:'updater',
      render:{
        children:`{({text,record,index})=>text||record.creator}`,
      },
      /* render:`{
        ({text,record,index})=>text||record.creator;
      }`, */
    },
    {
      title:'操作',
      dataIndex:'action',
      align:'center',
      tools:'handleCheck,handleEdit,handleDelete',
      /* render:{
        type:'span',
        // props:`{}`,
        children:[
          {
            type:'Button',
            props:`{({text,record,index,actions})=>{
              return {
                type:'link',
                size:'small',
                onClick:e=>actions['handleCheck'](record),
                children:'查看',
              };
            }}`,
          },
          {
            type:'Button',
            props:`{({text,record,index,actions})=>{
              return {
                type:'link',
                size:'small',
                onClick:e=>actions['handleEdit'](record),
                children:'编辑',
              };
            }}`,
          },
          {
            type:'Button',
            props:`{({text,record,index,actions})=>{
              const disabled=false;
              return {
                type:'link',
                size:'small',
                style:{color:disabled?'var(--light-color)':'var(--red2)'},
                onClick:e=>actions['handleBatch'](record),
                children:'删除',
              };
            }}`,
          },
        ],
      }, */
      /* render:`{
        ({text,record,index,actions})=>{
          return <>
            <Button type="link" size="small" onClick={e=>actions['handleCheck'](record)}>查看</Button>
            <Button type="link" size="small" onClick={e=>actions['handleEdit'](record)}>编辑</Button>
            <Button type="link" size="small" onClick={e=>actions['handleEdit'](record)} style={{color:var(--red2)}}>删除</Button>
          </>;
        };
      }`, */
    },
  ],
  searchSchema,
  modalSchema,
};

const schema={
  type:'CustomTable',
  props:tableSchema,
};

export default schema;
