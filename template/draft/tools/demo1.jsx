import {useState,useCallback,useEffect} from 'react';
import { Table, Tag, Space } from 'antd';

const pageStyle={};

const articleStyle={
  padding:'10px 12px',
  backgroundColor:'#fff',
  color:'#333',
  marginBottom:'10px',
};

const Test=props=><div {...props} />;

const Index=props=>{
  return <div style={pageStyle}>
    <div>
      <article style={articleStyle}>
        <h2>一些常用命令</h2>
        <ul>
          <li>启动mongodb:mongod --dbpath /Users/huyong/mongodb/data/demo1</li>
          <li>连接远程服务:ssh root@47.105.94.51</li>
          <li>本地拷贝到服务器:scp -r * root@47.105.94.51:/root/test/</li>
          <li>本地拷贝到服务器:scp -r dist root@47.105.94.51:/root/demo1/</li>
          <li>服务器拷贝到本地:scp -r root@47.105.94.51:/root/test/ ./</li>

          <li>带端口:ssh root@47.105.94.51 -p 3222</li>
          <li>带端口:scp -P 3222 dist.zip root@172.24.5.142:/data/bigdata/20200703v3.6.0/</li>
        </ul>
      </article>
      <article style={articleStyle}>
        <h2>一些常用命令</h2>
        <ul>
          <li>vi /etc/init.d/nodemanage.sh</li>
          <li>scp -r * ubuntu:/root/dbservers/</li>
          <li>scp -r * ubuntu:/root/nodeservers/</li>
          <li>scp -r * ubuntu:/root/projects/demo1/</li>
        </ul>
      </article>
      <article style={articleStyle}>
        <h2>test</h2>
        <Test>
          <ul>
            <li>vi /etc/init.d/nodemanage.sh</li>
            <li>scp -r * ubuntu:/root/dbservers/</li>
            <li>scp -r * ubuntu:/root/nodeservers/</li>
            <li>scp -r * ubuntu:/root/projects/demo1/</li>
          </ul>
        </Test>
      </article>
    </div>
  </div>;
};

export default Index;


