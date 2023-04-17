import {marked} from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
// import 'highlight.js/styles/atom-one-dark.css';
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, {language}).value;
  },
  langPrefix: 'hljs language-',
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false,
});

export default marked;
