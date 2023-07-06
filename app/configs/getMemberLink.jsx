import {storage} from '@huxy/utils';
import Icon from '@app/components/icon';

const getMemberLink = (i18ns = {}) => ({
  key: 'chatbot',
  name: i18ns.chatbot ?? 'AI助手',
  icon: <Icon icon="RobotOutlined" />,
  type: 'link',
  link: `http://chat.ihuxy.com?authed_token=${storage.get('token')}`,
});

export default getMemberLink;
