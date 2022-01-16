import ReactDOM from 'react-dom';

import App from './app';
import initSW from './sw';

import '@common/styles/index.less';
import '@app/assets/styles.less';

const mountNode = document.getElementById('app');

// ReactDOM.createRoot(mountNode).render(<App />);

ReactDOM.render(<App />, mountNode);

initSW();
