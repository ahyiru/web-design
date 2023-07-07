import {createRoot} from 'react-dom/client';

import App from './app';

import init from './init';

import '@app/commons/styles/index.less';
import '@app/assets/styles.less';

createRoot(document.getElementById('app')).render(<App />);

init();
