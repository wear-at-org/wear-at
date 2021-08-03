import api from 'api';
import { useEffect, useReducer } from 'react';
import { userReducer } from 'utils/UserReducer';
import toastHook from 'hooks/useToastHook';

const useEditUserInfo = () => {
  const [showToast, hideToast] = toastHook({ type: '', content: '' });
  const [user, dispatch] = useReducer(userReducer, {});

  useEffect(() => {
    const getMydata = async () => {
      const { data } = await api.get('user');
      dispatch({ type: 'INIT', data });
    };
    getMydata();
  }, []);

  const updateUserInfo = async () => {
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
    window.scrollTo(0, 0);
    hideToast();
    showToast({ type: 'info', content: '수정 되었습니다.' });
  };

  const updateUserProfile = async (profileImage) => {
    await api.put('user', {
      profileImage,
    });
    window.scrollTo(0, 0);
    hideToast();
    showToast({ type: 'info', content: '수정 되었습니다.' });
  };

  return { user, dispatch, updateUserInfo, updateUserProfile };
};

export default useEditUserInfo;
