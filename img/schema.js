const schema={
  type:'a',
  props:{},
  children:[],
};


const render=(schema,params)=>{
  schema=Array.isArray(schema)?schema:[schema];
  const dom=schema.map((item,i)=>{
    let {type,props,children}=item;
    type=(type||'div').trim();
    const first=type.charAt(0);
    type=first.toUpperCase()===first?(components[type]||'div'):type;
    props={
      key:i,
      ...formatProps(props,params),
    };
    children=Array.isArray(children)?render(children,params):[formatChildren(children||props.children,params)??null];
    return createElement(type,props,...children);
  });
  return dom;
};

const formatProps=(props,params)=>{
  const matched=matchedStr(props||{});
  if(matched){
    try{
      const value=str2code(matched);
      return typeof value==='function'?value(params):value;
    }catch(error){
      return props;
    }
  }
  if(isObject(props)){
    let newProps={};
    Object.keys(props).map(key=>{
      const value=formatProps(props[key],params);
      if(key==='@rest'){
        newProps={...newProps,...value};
      }else{
        newProps[key]=value;
      }
    });
    return newProps;
  }
  return props;
};

{
  prop:'test',
  isPending:`{true}`,
  style:`{{width:'800px'}}`,
  handle:`{self=>self.rules}`,
  onClick:`{()=>e=>alert('hello')}`,
}

const matchedStr=(str,c=['{','}'])=>str?.trim?.().match(new RegExp(`^${c[0]}([\\s\\S]*)${c[1]}$`))?.[1];


const str2code=(str,hasReturn=false)=>{
  str=hasReturn?str:`return ${str};`;
  const exec=Function(str);
  return exec();
};


const pageSchema=async ({id})=>{
  const {result}=await apiList.listSchemaFn({routerId:id,projectId:defProject._id});
  return {result};
};
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
}

const Index=props=>{
  const {pageSchema}=props;
  if(pageSchema==null||pageSchema.pending){
    return <Spinner global />;
  }
  return customRender(pageSchema.result||[],{},props);
};



const preview=()=>{
  const {routerId,projectId}=props.params||{};

  const schemas=schemaTree[0].children;
  session.set(routerId,schemas);

  const {hash,origin}=location;
  const q=`?projectId=${projectId}&routerId=${routerId}`;
  const url=hash?`${origin}/#/preview${q}`:`${origin}/preview${q}`;
  window.open(url);
};

const Index=props=>{
  const pageSchema=utils.session.get(props?.params?.routerId);
  return customRender(pageSchema||[],{},props);
};


const {record,undo,redo,clean}=cacheData();

const editProps=values=>{
  const tree=editNodes(schemaTree,selectedKey,{props:values},'key');
  setSchema(tree);
  record(clone(tree));
  setDisableUndo(false);
};

const onDrop=info=>{
  const fromId=info.dragNode.key;
  const toId=info.node.key;
  const dropPosition=info.dropPosition;
  const tree=moveNodes(schemaTree,fromId,toId,dropPosition,'key');
  setSchema(tree);
};

const undoDesign=()=>{
  const {index,data}=undo();
  setSchema(data);
  if(index===0){
    setDisableUndo(true);
  }
  setDisableRedo(false);
};

const redoDesign=()=>{
  const {index,length,data}=redo();
  setSchema(data);
  if(index===length-1){
    setDisableRedo(true);
  }
  setDisableUndo(false);
};






















