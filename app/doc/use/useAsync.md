## useAsync

用于统一处理数据请求，返回数组形如 [state,setState] ，根据返回的state来处理pending、error、success，如：

	state instanceof Error?errorLoad(state):
	state===undefined?<Spinner />:<Component />

setState用于触发请求，传参为一个请求对象，如：

	setState({
		user:fetchUser(),
		books:fetchBook(id),
	});

### useAsync使用

	const [state,setState]=useAsync();
	
	setState({
	  user:fetchUser({id:id++}),
	  device:fetchDevice({params}),
	});
	
	user?.data?<Component data={user.data} />:<Spinner />

### 实现

#### update

重新请求数据。

	const update=useCallback(async asyncFns=>{
	  const keys=Object.keys(asyncFns);
	  for(let i=0,l=keys.length;i<l;i++){
	    const key=keys[i];
	    cancellablePromise(asyncFns[key]).then(res=>{
	      const {result}=res;
	      resultRef.current[key]=result;
	      setState({...resultRef.current});
	    }).catch(err=>{
	      resultRef.current[key]=err;
	      setState({...resultRef.current});
	    });
	  }
	},[]);

#### reset state

重置state，可指定 `setState(asyncFnObj,false)` 第二个参数设置是否重置，默认每次update都重置当前请求的值。

	const clearResult=useCallback(keys=>{
	  if(Array.isArray(keys)&&keys.length){
	    keys.map(key=>delete resultRef.current[key]);
	  }else{
	    resultRef.current={};
	  }
	  setState(resultRef.current);
	},[]);

#### throttle

当前请求没处理完禁止再次请求。

	if(pendingRef.current[eventKey]){
	  return;
	}

#### useCancelablePromise

可用于控制请求操作取消。

	const useCancelablePromise=deps=>{
	  const promises=useRef([]);
	  useEffect(()=>{
	    return ()=>{
	      promises.current.map(fn=>fn.cancelFn());
	      promises.current=[];
	    };
	  },deps);
	  const cancellablePromise=fn=>{
	    const wrapPromise=cancelablePromise(fn);
	    promises.current.push(wrapPromise);
	    return wrapPromise.promiseFn;
	  };
	  return {cancellablePromise};
	};




