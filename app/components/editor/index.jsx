import {useState, useMemo, useCallback} from 'react';
import isHotkey from 'is-hotkey';
import {Editable, withReact, useSlate, Slate} from 'slate-react';
import {Editor, Transforms, createEditor, Descendant, Element as SlateElement} from 'slate';
import {withHistory} from 'slate-history';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const initVal = [
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
    type: 'block-quote',
    children: [{text: 'A wise quote.'}],
  },
  {
    type: 'paragraph',
    children: [{text: 'Try it out for yourself!'}],
  },
];

const Index = (props) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initVal);
  const renderElement = useCallback((params) => {}, []);
  const renderLeaf = useCallback((params) => {}, []);

  return (
    <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              // toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  );
};

export default Index;
