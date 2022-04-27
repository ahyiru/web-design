import {useState, useRef} from 'react';
import {Button, Space} from 'antd';
import {Spinner, Anico, LoadError, HandleError} from '@huxy/components';
import {traverItem} from '@huxy/utils';
import {useClickAway, useUpdate} from '@huxy/use';
import {Row, Col} from '@app/components/row';
import Panel from '@app/components/panel';
import Ellipsis from '@app/components/ellipsis';
import {typeList, data} from './config';
import './index.less';

const ErrorComp = ({state, name}) => <div>{state[name]}</div>;

const Index = (props) => {
  const [type, setType] = useState('');
  const [demoError, setDemoError] = useState({});

  const rerender = useUpdate();
  const itemClick = (e, item) => {
    e.stopPropagation();
    traverItem((v) => {
      if (item.value === v.value) {
        if (item.list?.length) {
          v.open = !item.open;
        } else {
          v.active = true;
        }
      } else {
        v.open = false;
        v.active = false;
      }
    })(data);
    rerender();
  };

  return (
    <Row>
      <Col span={6}>
        <Panel>
          <div style={{width: 200}}>
            <Ellipsis>12233345657688967i8ijhfgrtrrfgthtgryhhyt</Ellipsis>
          </div>
          <div style={{width: 200}}>
            <Ellipsis>33333</Ellipsis>
          </div>
          <div style={{width: 100}}>
            <Ellipsis>12233345657688967i8ijhfgrtrrfgthtgryhhyt</Ellipsis>
          </div>
        </Panel>
      </Col>
      <Col span={6}>
        <Panel>
          <div style={{padding: 20}}>
            <Anico type={type} />
          </div>
          <div>
            <Space>
              {typeList.map(({key, name}) => (
                <Button key={key} type={key === type ? 'primary' : ''} onClick={(e) => setType(key)}>
                  {name}
                </Button>
              ))}
            </Space>
          </div>
        </Panel>
      </Col>
      <Col span={6}>
        <Panel>
          <Spinner />
        </Panel>
      </Col>
      <Col span={6}>
        <Panel>
          <div>{LoadError({error: 'load error demo'})}</div>
          <HandleError>
            <ErrorComp state={demoError} name="eb" />
          </HandleError>
          {demoError && <Button onClick={(e) => setDemoError(null)}>load</Button>}
        </Panel>
      </Col>
      <Col>
        <Panel>
          <ul className="demo-styles">
            {data.map((li, i) => (
              <LiItem key={li.value} li={li} itemClick={itemClick} />
            ))}
          </ul>
        </Panel>
      </Col>
    </Row>
  );
};

const LiItem = ({li, itemClick}) => {
  const liRef = useRef();
  useClickAway(liRef, (e) => li.open && itemClick(e, li));
  return (
    <li ref={liRef} className={`${li.open ? 'open' : ''}`} onClick={(e) => itemClick(e, li)}>
      <a className={`demo-follow${li.active ? ' active' : ''}`}>
        <span>{li.name}</span>
        {li.list?.length ? <i className={`demo-angle-${li.open ? 'top' : 'bt'}`} /> : null}
      </a>
      {li.list?.length ? (
        <ul className="demo-arrow-rt">
          {li.list.map((item) => (
            <li key={item.value}>
              <a className="demo-tooltip" tooltips={item.name}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default Index;
