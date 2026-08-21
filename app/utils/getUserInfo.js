import {getApi} from '@app/apis/apiList';
import {logout} from '@app/utils/utils';
import {userInfoStore} from '@app/store/stores';

const getUserInfo = async () => {
  const {code, result} = (await getApi().profileFn()) || {};
  if (!result) {
    logout(true);
    return result;
  }
  if (code === 200) {
    userInfoStore.setState(result);
    return result;
  }
};

export default getUserInfo;
