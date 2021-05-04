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

  return [user, dispatch];
};

export default useEditUserInfo;
