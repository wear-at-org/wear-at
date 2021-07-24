import api from 'api';
import { useEffect, useReducer } from 'react';
import { userReducer } from 'utils/UserReducer';

const useEditUserInfo = () => {
  const [user, dispatch] = useReducer(userReducer, {});

  useEffect(() => {
    const getMydata = async () => {
      const { data } = await api.get('user');
      dispatch({ type: 'INIT', data });
    };
    getMydata();
  }, []);

  const updateUserInfo = async () => {
    console.log(user);
    await api.put('user', {
      address: user.address,
      birthday: user.birthday,
      birthmonth: user.birthmonth,
      birthyear: user.birthyear,
      checkPrivacyPolicy: user.checkPrivacyPolicy,
      checkReceivingConsent: user.checkReceivingConsent,
      checkServiceTerms: user.checkServiceTerms,
      detailAddress: user.detailAddress,
      email: user.email,
      gender: user.gender,
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      zipCode: user.zipCode,
    });
  };
  return { user, dispatch, updateUserInfo };
};

export default useEditUserInfo;
