import {useState, useEffect} from 'react';
import {Light} from '@huxy/materials';
import './index.less';

const Index = props => {
  return (
    <div className="demo-page-container">
      <div className="cylinder" />
      <Light />
    </div>
  );
};

export default Index;
