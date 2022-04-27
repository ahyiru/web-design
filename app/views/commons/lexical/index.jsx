import {useState, useMemo, useCallback} from 'react';
import {createEditor} from 'slate';
import {Editable, withReact, Slate} from 'slate-react';

import {withHistory} from 'slate-history';

import {firstUpper} from '@huxy/utils';

import Panel from '@app/components/panel';

import * as elements from './types/components/text';

import Toolsbar from './types/renderElement/toolsbar';

const initialValue = [
  {
    type: 'paragraph',
    children: [{text: 'This is editable '}, {text: 'rich', bold: true}, {text: ' text, '}, {text: 'much', italic: true}, {text: ' better than a '}, {text: '<textarea>', code: true}, {text: '!'}],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Since it\'s rich text, you can do things like turn a selection of text ',
      },
      {text: 'bold', bold: true},
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'quote',
    children: [{text: 'A wise quote.'}],
  },
  {
    type: 'paragraph',
    children: [{text: 'Try it out for yourself!'}],
  },
];

const Leaf0 = ({attributes, children, leaf}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const Leaf = ({attributes, children, leaf}) => {
  const {text, ...rest} = leaf;
  Object.keys(rest)
    .filter(Boolean)
    .map((key) => {
      const LeafComp = elements[firstUpper(key)];
      children = <LeafComp>{children}</LeafComp>;
      // console.log(333,rest,key,children);
    });
  return <span {...attributes}>{children}</span>;
};

const Index = (props) => {
  const i18ns = props.store.getState('i18ns');
  const i18nCfg = i18ns?.main?.editor ?? {};
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initialValue);

  const renderElement = useCallback((params) => {
    const Comp = elements[firstUpper(params.element.type)] || elements.DefaultElement;
    // console.log('renderElement',params,Comp);
    return <Comp {...params} />;
  }, []);
  const renderLeaf = useCallback((params) => {
    const {text, ...rest} = params.leaf;
    // const Comp=elements[params.element.format]||elements.DefaultElement;
    // console.log('renderLeaf',params);
    return <Leaf {...params} />;
  }, []);
  // const renderLeaf = useCallback(params => <Leaf {...params} />, []);
  // console.log(12,editor);

  return (
    <Panel title="slate editor - 未完成！">
      <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <Toolsbar i18nCfg={i18nCfg} />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          /* onKeyDown={event => {
          if (event.key === '`' && event.ctrlKey) {
            event.preventDefault();
            // 确定当前选中的块是否为任意的代码块.
            const [match] = Editor.nodes(editor, {
              match: n => n.type === 'code',
            });
            // 根据是否已经存在匹配项来切换 block 的类型.
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              { match: n => Editor.isBlock(editor, n) },
            );
          }
        }} */
          style={{border: '1px solid #f3f3f3', minHeight: 300}}
        />
      </Slate>
    </Panel>
  );
};

export default Index;
