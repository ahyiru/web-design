import {marked} from 'marked';
import hljs from 'highlight.js';
// import 'highlight.js/styles/monokai-sublime.css';
import 'highlight.js/styles/atom-one-dark.css';
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: (code) => {
    return hljs.highlightAuto(code).value;
  },
});

export default marked;
