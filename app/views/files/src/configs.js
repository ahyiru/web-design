import {Fragment} from 'react';
import {FileTextOutlined, FolderOpenOutlined} from '@ant-design/icons';
import {formatTime, fixFileSizeUnit} from '@huxy/utils';
import {Drop} from '@huxy/components';

import {titlePattern, linuxPathPattern} from '@app/utils/patterns';

import ItemDetail from './itemDetail';
import FilePath from './filePath';

const DeleteAlert = ({filename, type}) => (
  <span>
    确定删除文件{type === 'dir' ? '夹' : ''} <b style={{color: 'var(--red2)'}}>{filename}</b> 吗？
  </span>
);

export const context = [
  {
    action: 'details',
    label: '详情',
    type: 'file',
    ModalInfo: ItemDetail,
  },
  {
    action: 'copy',
    label: ' 拷贝',
  },
  {
    action: 'delete',
    label: '删除',
    ModalInfo: DeleteAlert,
  },
  {
    action: 'move',
    label: '移动至',
    ModalInfo: props => <FilePath pattern={linuxPathPattern} {...props} filename="/" />,
  },
  {
    action: 'rename',
    label: '重命名',
    ModalInfo: props => <FilePath pattern={titlePattern} {...props} />,
  },
  {
    action: 'addfile',
    label: '添加文件',
    type: 'dir',
    ModalInfo: props => <FilePath pattern={titlePattern} {...props} filename="" />,
  },
  {
    action: 'adddir',
    label: '添加文件夹',
    type: 'dir',
    ModalInfo: props => <FilePath pattern={titlePattern} {...props} filename="" />,
  },
];

const actionInfos = isDir => context.filter(item => (isDir ? item.type !== 'file' : item.type !== 'dir'));

const DropDown = ({filename, type, handleModal}) => (
  <div className="drop-list">
    <ul>
      {actionInfos(type === 'dir').map(({action, label, ModalInfo}) => (
        <li key={action} onClick={e => handleModal({filename, type, action, label, ModalInfo})}>
          <a className="link">{label}</a>
        </li>
      ))}
    </ul>
  </div>
);

const DropList = ({type, filename, handleModal, handleClick}) => (
  <Drop
    trigger="contextMenu"
    dropList={<DropDown filename={filename} type={type} handleModal={handleModal} />}
    style={{
      '--bgColor': 'rgba(52, 53, 65, 1)',
      '--borderColor': 'rgba(0, 0, 0, 0.1)',
      '--linkColor': 'var(--asideLinkColor)',
    }}
  >
    <a className="link" onClick={e => handleClick?.(filename, type)}>
      <span style={{fontSize: '1.3rem', marginRight: '4px'}}>{type === 'dir' ? <FolderOpenOutlined /> : <FileTextOutlined />}</span>
      <span>{filename}</span>
    </a>
  </Drop>
);

export const header = [
  {
    key: 'filename',
    label: '文件名',
    DropList,
  },
  {
    key: 'type',
    label: '类型',
  },
  {
    key: 'size',
    label: '大小',
    format: fixFileSizeUnit,
  },
  {
    key: 'mtime',
    label: '修改日期',
    flex: 2,
    format: formatTime,
  },
  {
    key: 'birthtime',
    label: '创建日期',
    flex: 2,
    format: formatTime,
  },
];

export const ListHeader = () => (
  <div className="fs-info fs-header">
    {header.map(({key, label, flex}) => (
      <div key={key} style={flex ? {flex} : null}>
        {label}
      </div>
    ))}
  </div>
);

export const List = ({fileList, handleModal, handleClick}) =>
  fileList.map(item => (
    <div key={item.filename} className="fs-info">
      {header.map(({key, label, flex, format, DropList}) => (
        <Fragment key={key}>
          <div style={flex ? {flex} : null}>
            {DropList ? <DropList handleModal={handleModal} type={item.type} filename={item.filename} handleClick={handleClick} /> : format ? format(item[key]) : item[key]}
          </div>
        </Fragment>
      ))}
    </div>
  ));
