import {useState, useMemo, useCallback} from 'react';
import {createEditor} from 'slate';
import {Editable, withReact, Slate} from 'slate-react';
import {withHistory} from 'slate-history';

import {firstUpper} from '@huxy/utils';

import Panel from '@app/components/panel';

import Toolsbar from './toolsbar';

import {initialValue, elements} from '../configs';

import './toolsbar/index.less';

const Leaf = ({attributes, children, leaf}) => {
  const {text, ...rest} = leaf;
  Object.keys(rest)
    .filter(Boolean)
    .map(key => {
      const LeafComp = elements[firstUpper(key)];
      children = LeafComp ? <LeafComp>{children}</LeafComp> : children;
    });
  return <span {...attributes}>{children}</span>;
};

const renderElement = ({element, ...rest}) => {
  const Comp = elements[firstUpper(element.type)] || elements.DefaultElement;
  return <Comp {...rest} />;
};

const Index = props => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initialValue);

  return (
    <Panel title="slate editor - 未完待续！" className="rich-text-demo">
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Toolsbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={params => <Leaf {...params} />}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          style={{border: '1px solid #f3f3f3', minHeight: 300}}
        />
      </Slate>
    </Panel>
  );
};

export default Index;
