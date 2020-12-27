import React from 'react';
import { useSelector } from 'react-redux';
import { spinnerName } from 'store';

const Loader = () => {
  const { count } = useSelector((state) => state[spinnerName]);
  if (count > 0) {
    return <div className="loading" />;
  }
  return null;
};
export default Loader;
