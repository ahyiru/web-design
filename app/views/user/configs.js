export {default as logo} from '@app/assets/images/logo.svg';
import * as rules from '@app/utils/rules';
export const formRules = rules;

export const githubConfigs = {
  github_client_id: 'xxx',
  github_oauth_url: 'https://github.com/login/oauth/authorize',
};

export const wechatConfigs = {
  appid: 'xxx',
  wechat_oauth_url: 'https://open.weixin.qq.com/connect/oauth2/authorize',
  redirect_uri: 'https://ihuxy.com/user/signin',
  response_type: 'code',
  scope: 'snsapi_base', //'snsapi_userinfo',
  state: 'wechat',
};
