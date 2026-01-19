import {useState, useEffect} from 'react';
import apiList from '@app/apis/apiList';
import {logout} from '@app/utils/utils';
import {defProject} from '@app/configs';
import {userInfoStore, permissionStore, routersStore} from '@app/store/stores';

const useGetProfile = () => {
  const {profileFn, listAuthFn, listRouterFn} = apiList;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      try {
        const {code, result} = (await profileFn()) || {};
        if (!result) {
          logout(true);
          setLoading(false);
          return;
        }
        if (code === 200) {
          userInfoStore.setState(result);
          getAuths(result);
        }
      } catch (err) {
        setLoading(false);
      }
    };
    const getAuths = async profile => {
      try {
        const {code, result} = (await listAuthFn({uid: profile?.id})) || {};
        if (code === 200) {
          permissionStore.setState(result);
          getRouters(profile);
        }
      } catch (err) {
        setLoading(false);
      }
    };
    const getRouters = async profile => {
      try {
        const {code, result} = (await listRouterFn({projectId: profile?.projectId || defProject.id})) || {};
        setLoading(false);
        if (code === 200) {
          routersStore.setState(result);
        }
      } catch (err) {
        setLoading(false);
      }
    };
    getProfile();
  }, []);
  return [loading];
};

export default useGetProfile;
