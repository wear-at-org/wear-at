import React, { useEffect } from 'react';
import api from 'api';

const Introservice = () => {
  useEffect(() => {
    const data = api.get('user');
    console.log(data);
  }, []);

  return <div className="">Introservice</div>;
};

export default Introservice;
