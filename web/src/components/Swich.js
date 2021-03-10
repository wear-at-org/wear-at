import React, { useState } from 'react';

export default function Swich(props) {
  const { active } = props;
  const [isActive, setIsActive] = useState(active);
  const clcikEvent = () => {
    console.log('click');
    setIsActive(!isActive);
    console.log(isActive);
    props.clickEvent(!isActive);
  };
  return (
    <div className="switch" onClick={clcikEvent}>
      <input className={active ? 'active' : ''} type="checkbox" defaultChecked={isActive} />
      <span className="slider" />
    </div>
  );
}
