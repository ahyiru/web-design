import {useState, useEffect, useRef, useCallback} from 'react';
import {message, fixPath} from '@huxy/utils';
import {Modal} from '@huxy/components';
import {Row, Col} from '@app/components/row';
import Panel from '@app/components/panel';
import MaxSize from '@app/components/maxSize';
import Button from '@app/components/base/button';
import {userInfoStore} from '@app/store/stores';

import apis from './getApis';

import FileInput from './fileInput';
import {ListHeader, List, context} from './configs';

import './index.less';

const Index = props => {
  const profile = userInfoStore.getState() || {};
  const isAdmin = profile.role === 5;
  const fileRef = useRef();
  const [path, setPath] = useState('/');
  const [action, setAction] = useState({});
  const [fileList, setFileList] = useState([]);
  const modalInputVaule = useRef();

  const updateList = useCallback(async path => {
    try {
      const {result} = await apis.readdirFn({path});
      setFileList(result || []);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    updateList(path);
  }, [path]);

  const handleClick = (filename, type) => {
    const fullpath = fixPath(`${path}/${filename}`);
    if (type === 'dir') {
      setPath(fullpath);
    } else {
      setAction({
        action: 'updateContent',
        filename,
        modalProps: {
          open: true,
          title: '更新内容',
          children: <FileInput path={fullpath} modalInputVaule={modalInputVaule} />,
          style: {
            width: '60%',
            maxWidth: '800px',
          },
        },
      });
    }
  };

  const goTo = (route, i) => {
    const toPath = path.split('/').slice(0, i + 1).join('/') || '/';
    if (path !== toPath) {
      setPath(toPath);
    }
  };

  const handleCopy = async ({fullpath}) => {
    await apis.copyfileFn({src: fullpath, dst: path});
    message.success('拷贝成功！');
    updateList(path);
  };
  const handleModal = async ({filename, type, action, label, ModalInfo}) => {
    const fullpath = fixPath(`${path}/${filename}`);
    if (action === 'copy') {
      handleCopy({fullpath});
      return;
    }
    setAction({
      action,
      filename,
      modalProps: {
        open: true,
        title: label,
        children: <div>
          <h4>当前文件{type === 'dir' ? '夹' : ''}：{fixPath(`${path}/${filename}`)}</h4>
          <ModalInfo filename={filename} type={type} path={fullpath} modalInputVaule={modalInputVaule} />
        </div>,
      },
    });
  };


  const addFiles = async (e, isDir) => {
    e.stopPropagation();
    let item;
    if (isDir) {
      item = context.find(({action}) => action === 'adddir');
    } else {
      item = context.find(({action}) => action === 'addfile');
    }
    const {action, label, ModalInfo} = item || {};
    setAction({
      action,
      modalProps: {
        open: true,
        title: label,
        children: <div>
          <h4>当前目录：{path}</h4>
          <ModalInfo modalInputVaule={modalInputVaule} />
        </div>,
      },
    });
  };

  const handleApis = {
    delete: async filename => {
      await apis.rmfileFn({path: fixPath(`${path}/${filename}`)});
      message.success('删除成功！');
    },
    move: async (filename, value) => {
      await apis.movefileFn({src: fixPath(`${path}/${filename}`), dst: value});
      message.success('移动成功！');
    },
    rename: async (filename, value) => {
      await apis.rnfileFn({path: fixPath(`${path}/${filename}`), newpath: fixPath(`${path}/${value}`)});
      message.success('重命名成功！');
    },
    adddir: async (filename, value) => {
      await apis.mkdirFn({path: fixPath(`${path}/${filename ?? ''}/${value}`)});
      message.success('添加文件夹成功！');
    },
    addfile: async (filename, value) => {
      await apis.touchFn({path: fixPath(`${path}/${filename ?? ''}/${value}`)});
      message.success('添加文件成功！');
    },
    updateContent: async (filename, value) => {
      if (!isAdmin) {
        message.error('当前账户无权进行此操作！');
        return;
      }
      await apis.touchFn({path: fixPath(`${path}/${filename}`), data: value});
      message.success('更新内容成功！');
    },
  };
  const submit = async e => {
    if (modalInputVaule.current) {
      const {value, pattern, message: msg} = modalInputVaule.current;
      if (!value) {
        message.error('请输入内容！');
        return;
      }
      if (pattern && !pattern.test(value)) {
        message.error(msg);
        return;
      }
      await handleApis[action.action]?.(action.filename, value);
      modalInputVaule.current = null;
    } else {
      await handleApis[action.action]?.(action.filename);
    }
    updateList(path);
    setAction({});
    
  };
  return <div className="file-system">
    <Row>
      <Col span={12}>
        <div ref={fileRef}>
          <div className="fs-topbar">
            <ul className="current-route">
              {
                path === '/' ? <li>
                  <a className="link">root</a>
                </li> : path.split('/').map((route, i) => <li key={route || 'root'}>
                  <a className="link" onClick={e => goTo(route, i)}>{route || 'root'}</a>
                </li>)
              }
            </ul>
            <div className="right-bar">
              <Button onClick={e => addFiles(e, true)}>添加文件夹</Button>
              <Button onClick={addFiles}>添加文件</Button>
              <MaxSize panel={fileRef} />
            </div>
          </div>
          <Panel>
            <ListHeader />
            <List fileList={fileList} handleModal={handleModal} handleClick={handleClick} />
          </Panel>
        </div>
      </Col>
    </Row>
    <Modal close={e => setAction({})} submit={submit} {...action.modalProps} />
  </div>;
};

export default Index;
