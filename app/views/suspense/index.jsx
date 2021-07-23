import {Suspense} from 'react';

import {utils,components} from '@common';

import {Table,Select,InputNumber,Switch,Button} from 'antd';

import Panel from '@app/components/panel';
import {Row,Col} from '@app/components/row';

import {suspenseApis} from '@app/utils/getApis';
import {susTest1,susTest2} from './suspenseFns';

const {profileSuspense,allUserSuspense}=suspenseApis;

const userinfo=susTest1();
const users=susTest2();
const userinfo1=profileSuspense();
const users1=allUserSuspense();

const {Spinner}=components;

const columns=[{dataIndex:'name',title:'姓名'},{dataIndex:'email',title:'邮箱'}];

const UserInfo=({userinfo,title})=>{
  const {result}=userinfo.read();
  const info=Object.keys(result).map(v=>({key:v,value:result[v]}));
  return <Panel>
    <h2>{title||'个人信息'}</h2>
    {
      info.map(({key,value})=><div><span>{key}：</span><span>{value}</span></div>)
    }
  </Panel>;
};
const Allusers=({users,title})=>{
  const {result}=users.read();
  return <Panel>
    <h2>{title||'用户信息'}</h2>
    <Table dataSource={result?.list??[]} columns={columns} />
  </Panel>;
};

const Index=props=>{
  return <div>
    <Row>
      <Col span={6}>
        <Suspense fallback={<Spinner />}>
          <UserInfo userinfo={userinfo} title="sus-test1" />
        </Suspense>
      </Col>
      <Col span={6}>
        <Suspense fallback={<Spinner />}>
          <Allusers users={users} title="sus-test2" />
        </Suspense>
      </Col>
    </Row>
    <Row>
      <Col span={6}>
        <Suspense fallback={<Spinner />}>
          <UserInfo userinfo={userinfo1} />
        </Suspense>
      </Col>
      <Col span={6}>
        <Suspense fallback={<Spinner />}>
          <Allusers users={users1} />
        </Suspense>
      </Col>
    </Row>
  </div>;
};

export default Index;


