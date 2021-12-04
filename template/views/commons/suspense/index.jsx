import {Suspense} from 'react';
import {components} from '@common';
import {Table} from 'antd';
import Panel from '@app/components/panel';
import {Row,Col} from '@app/components/row';
// import {suspenseApis} from '@app/utils/getApis';
import {susTest1,susTest2} from './suspenseFns';

// const {profileSuspense,allUserSuspense}=suspenseApis;

const userinfo=susTest1();
const users=susTest2();
// const userinfo1=profileSuspense();
// const users1=allUserSuspense();

const {Spinner}=components;

const columns=i18nCfg=>[{dataIndex:'name',title:i18nCfg.columns_title},{dataIndex:'email',title:i18nCfg.columns_email}];

const UserInfo=({userinfo,title})=>{
  const {result}=userinfo.read();
  const info=Object.keys(result).map(v=>({key:v,value:result[v]}));
  return <Panel>
    <h2>{title}</h2>
    {
      info.map(({key,value})=><div key={key}><span>{key}：</span><span>{value}</span></div>)
    }
  </Panel>;
};
const Allusers=({users,title,i18nCfg})=>{
  const {result}=users.read();
  return <Panel>
    <h2>{title}</h2>
    <Table dataSource={result?.list??[]} columns={columns(i18nCfg)} rowKey="name" />
  </Panel>;
};

const Index=props=>{
  const i18ns=props.store.getState('i18ns');
  const i18nCfg=i18ns?.main.suspense??{};
  return <div>
    <Row>
      <Col span={6}>
        <Suspense fallback={<Spinner />}>
          <UserInfo userinfo={userinfo} title="sus-test1" />
        </Suspense>
      </Col>
      <Col span={6}>
        <Suspense fallback={<Spinner />}>
          <Allusers users={users} title="sus-test2" i18nCfg={i18nCfg} />
        </Suspense>
      </Col>
    </Row>
    {/* <Row>
      <Col span={6}>
        <Suspense fallback={<Spinner />}>
          <UserInfo userinfo={userinfo1} title={i18nCfg.test1_title} />
        </Suspense>
      </Col>
      <Col span={6}>
        <Suspense fallback={<Spinner />}>
          <Allusers users={users1} title={i18nCfg.test2_title} i18nCfg={i18nCfg} />
        </Suspense>
      </Col>
    </Row> */}
  </div>;
};

export default Index;


