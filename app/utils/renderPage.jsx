import {components,utils} from '@common';

// import Tree from '@app/components/tree';
// import Table from '@app/components/table';

import Tree from '@app/views/projects/router';
import Table from '@app/views/projects';

const {Row,Col}=components;
const {isValidArr}=utils;

const comps={
  Row,
  Col,
  Tree,
  Table,
};

const renderPage=(props,data,childKey='children',index=0)=>{
  return data.map((item,i)=>{
    const hasChildren=isValidArr(item[childKey]);

    const Comp=comps[item.type];
    const prop=['Row','Col'].includes(item.type)?item.attr:{...props,...item.attr};

    if(hasChildren){
      return <Comp key={`${index}-${i}`} {...prop}>{renderPage(props,item[childKey],childKey,`${index}-${i}`)}</Comp>;
    }
    return <Comp key={`${index}-${i}`} {...prop} />;
  });
};

export default renderPage;
