export const cancelable=(promise,delay=16)=>{
  let timer=null;
  return new Promise((resolve,reject)=>{
    timer=setTimeout(()=>{
      clearTimeout(timer);
      resolve({result:()=>promise});
    },delay);
    promise.then(res=>{
      clearTimeout(timer);
      resolve({result:res});
    }).catch(error=>{
      clearTimeout(timer);
      reject({error});
    });
  });
};

export const promisify1=func=>(...args)=>new Promise((resolve,reject)=>func(...args,(err,result)=>(err?reject(err):resolve(result))));

export const sleep = (ms = 100) => {
  const start = Date.now();
  while(Date.now() - start <= ms){}
};

export const reconciler=promisifyFunc=>(...args)=>cancelable(promisifyFunc(...args)).promiseFn;

export const promisify=func=>(...args)=>{
  let timer=null;
  return new Promise((resolve,reject)=>{
    timer=setTimeout(()=>{
      // clearTimeout(timer);
      console.log(33);
      resolve({pending: true});
    },16);
    try{
      console.log(12);
      const result=func(...args);
      clearTimeout(timer);
      resolve(result);
    }catch(error){
      clearTimeout(timer);
      reject(error);
    }
  });
};

