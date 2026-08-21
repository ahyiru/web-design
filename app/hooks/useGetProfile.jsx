import {useState, useEffect} from 'react';
import {getApi} from '@app/apis/apiList';
import {defProject} from '@app/configs';
import {permissionStore, routersStore} from '@app/store/stores';
import getUserInfo from '@app/utils/getUserInfo';
import {useAsync} from '@huxy/use';

const useGetProfile = () => {
  const {listAuthFn, listRouterFn} = getApi();
  const [profilePendding, setProfilePendding] = useState(true);
  const [state, update] = useAsync();
  useEffect(() => {
    const getProfile = async () => {
      setProfilePendding(true);
      try {
        const result = await getUserInfo();
        if (!result) {
          setProfilePendding(false);
          return;
        }
        update({
          auths: listAuthFn({uid: result?.id}),
          routers: listRouterFn({projectId: result?.projectId || defProject.id})
        });
      } catch (err) {
        setProfilePendding(false);
      }
    };
    getProfile();
  }, []);
  if (state.allPendding === false) {
    permissionStore.setState(state.auths?.result);
    routersStore.setState(state.routers?.result);
  }
  return [profilePendding && state.allPendding];
};

export default useGetProfile;
