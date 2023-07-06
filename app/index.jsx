import {createRoot} from 'react-dom/client';

import App from './app';

import init from './init';

import '@app/commons/styles/index.less';
import '@app/assets/styles.less';

const mountNode = document.getElementById('app');

createRoot(mountNode).render(<App />);

init();
