export {default as logo} from '@app/assets/images/logo.png';
export {default as apiList} from '@app/apis/apiList';
import * as rules from '@app/utils/rules';
export const formRules = rules;

export const githubConfigs = {
  github_client_id: '61721ef923095e006d18',
  github_oauth_url: 'https://github.com/login/oauth/authorize',
};

export const wechatConfigs = {
  appid: 'wx7f4df123f88372a5',
  wechat_oauth_url: 'https://open.weixin.qq.com/connect/oauth2/authorize',
  redirect_uri: 'https://ihuxy.com/user/signin',
  response_type: 'code',
  scope: 'snsapi_base',//'snsapi_userinfo',
  state: 'wechat',
};