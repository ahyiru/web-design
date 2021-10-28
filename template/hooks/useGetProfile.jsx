import {useState,useEffect} from 'react';
import apiList from '@app/utils/getApis';
import {logout} from '@app/utils/utils';

const useGetProfile=()=>{
  const {profileFn,listAuthFn,listRouterFn}=apiList;
  const [profile,setProfile]=useState({});
  useEffect(()=>{
    const getProfile=async ()=>{
      const {code,result}=await profileFn()||{};
      if(!result){
        logout(true);
        return;
      }
      if(code===200){
        getAuths(result);
      }
    };
    const getAuths=async profile=>{
      const {code,result}=await listAuthFn({uid:profile?._id})||{};
      if(code===200){
        // setProfile({profile,permission:result});
        getRouters({profile,permission:result});
      }
    };
    const getRouters=async ({profile,permission})=>{
      const {code,result}=await listRouterFn({projectId:profile?.projectId})||{};
      if(code===200){
        setProfile({profile,permission,routerList:result});
      }
    };
    getProfile();
  },[]);
  return [profile];
};

export default useGetProfile;

