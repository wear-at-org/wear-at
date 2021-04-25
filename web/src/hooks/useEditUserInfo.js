import api from 'api';
import { useEffect, useReducer } from 'react';
import { userReducer } from 'utils/Reducer';

const useEditUserInfo = () => {
  const [user, dispatch] = useReducer(userReducer, {});

  useEffect(() => {
    const getMydata = async () => {
      const { data } = await api.get('user');
      dispatch({ type: 'INIT', data });
    };
    getMydata();
  }, []);

  const putUser = () => {};

  return [user, dispatch, putUser];
};

export default useEditUserInfo;
