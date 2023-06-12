import {marked} from 'marked';
import {markedHighlight} from 'marked-highlight';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
// import 'highlight.js/styles/atom-one-dark.css';
marked.use({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false,
});

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, {language}).value;
  },
}));

export default marked;
