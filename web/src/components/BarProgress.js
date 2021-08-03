import React from 'react';

const BarProgress = ({ percent, status }) => {
  return (
    <div className={`progress-conitaner ${status ? 'complete' : ''}`}>
      <div className="progress-back"></div>
      <div className="progress" style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default BarProgress;
