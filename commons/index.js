import * as utils from '@huxy/utils';
import * as components from '@huxy/components';
import * as use from '@huxy/use';
import {useRouter,Link,useRoute} from '@huxy/router';
import Layout from '@huxy/layout';

export {useRouter,Link,useRoute,utils,use,components,Layout};

window.useRouter=useRouter;
window.Link=Link;
window.useRoute=useRoute;
window.utils=utils;
window.use=use;
window.components=components;
window.Layout=Layout;


