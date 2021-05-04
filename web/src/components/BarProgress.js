import React from 'react';

const BarProgress = ({ percent }) => {
  return (
    <div className="progress-conitaner">
      <div className="progress-back"></div>
      <div className="progress" style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default BarProgress;
