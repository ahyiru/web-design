import ReactDOM from 'react-dom';

import App from './app';

import '@common/styles/global.less';
import '@app/assets/styles.less';

const mountNode=document.getElementById('app');

// ReactDOM.createRoot(mountNode).render(<App />);

ReactDOM.render(<App />,mountNode);
