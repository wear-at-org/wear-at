import React, { useState, useEffect } from 'react';
import api from 'api';
import { useHistory } from 'react-router-dom';

const Styletest = () => {
  const history = useHistory();
  const [stepArray, setStepArray] = useState([]);
  useEffect(() => {
    api.get('subscribe/query').then((res) => {
      setStepArray(res);
    });
  }, []);

  useEffect(() => {
    const unblock = history.block('정말 떠나실건가요?');
    return () => {
      unblock();
    };
  }, [history]);

  return <div className=""></div>;
};

export default Styletest;
