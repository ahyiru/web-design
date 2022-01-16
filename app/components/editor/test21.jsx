import {useState, useMemo, useCallback} from 'react';
import {Editor, Transforms, createEditor} from 'slate';
import {Editable, withReact, Slate} from 'slate-react';
import {CodeElement, DefaultElement} from './comps';
import Panel from '@app/components/panel';
const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{text: 'A line of text in a paragraph.'}],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
    }
  }, []);

  // 通过 useCallback 定义一个可以记忆的渲染叶子节点的函数
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Panel style={{minHeight: 300}}>
      <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <Editable
          renderElement={renderElement}
          // 传递渲染叶子节点函数
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
            case '`': {
              event.preventDefault();
              const [match] = Editor.nodes(editor, {
                match: (n) => n.type === 'code',
              });
              Transforms.setNodes(editor, {type: match ? null : 'code'}, {match: (n) => Editor.isBlock(editor, n)});
              break;
            }

            case 'b': {
              event.preventDefault();
              Transforms.setNodes(editor, {bold: true}, {match: (n) => Text.isText(n), split: true});
              break;
            }
            }
          }}
        />
      </Slate>
    </Panel>
  );
};

const Leaf = (props) => {
  return (
    <span {...props.attributes} style={{fontWeight: props.leaf.bold ? 'bold' : 'normal'}}>
      {props.children}
    </span>
  );
};

export default App;
