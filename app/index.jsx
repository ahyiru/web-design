import {createRoot} from 'react-dom/client';

import App from './app';

import getRouterAuth from '@app/globals/getRouterAuth';
import registerPwa from '@app/globals/registerPwa';

import '@app/commons/styles/index.less';
import '@app/assets/styles.less';

createRoot(document.getElementById('app')).render(<App />);

getRouterAuth();
registerPwa();
