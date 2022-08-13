import {createRoot} from 'react-dom/client';

import App from './app';
import initSW from './sw';

import '@common/styles/index.less';
import '@app/assets/styles.less';

const mountNode = document.getElementById('app');

createRoot(mountNode).render(<App />);

initSW();
