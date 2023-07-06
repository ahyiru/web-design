import {Row, Col} from '@huxy/components';
import {copyToClipboard, message} from '@huxy/utils';

import './index.less';
const icons = [
  'plus',
  'plus-circle',
  'minus',
  'close',
  'close-circle',
  'close-square',
  'close-left',
  'close-right',
  'check',
  'checked',
  'left',
  'right',
  'dleft',
  'dright',
  'refresh',
  'stop',
  'time',
  'history',
  'loop',
  'arrow-left',
  'arrow-up',
  'arrow-right',
  'arrow-down',
  'left-right',
  'up-down',
  'upload',
  'download',
  'waiting',
  'wait',
  'block',
  'square',
  'star',
  'solid-start',
  'circle-star',
  'snow',
  'radar',
  'flag',
  'solid-flag',
  'heart',
  'music',
  'sun',
  'knot',
  'male',
  'female',
  'dmale',
  'dfemale',
  'polygon',
  'forward',
  'table',
  'grid',
  'quad',
  'circle-left',
  'circle-right',
  'circle-bottom',
  'circle-top',
  'solid-box',
  'box',
  'caret-left',
  'caret-right',
  'round',
  'solid-round',
  'layout',
  'circle-outer',
  'border-outer',
];

const Index = props => {
  const copyText = v => {
    copyToClipboard(v);
    message.success('拷贝成功！');
  };
  return (
    <div className="page icon-list">
      <Row gutter={12}>
        {icons.map((v, k) => (
          <Col key={v} span={3} sm={4}>
            <div className="ilist" onClick={() => copyText(v)}>
              <span className={`ico-${v}`} />
              <span className="icon-name">{v}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Index;
