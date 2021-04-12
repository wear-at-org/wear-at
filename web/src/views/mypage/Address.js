import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const Address = ({ showPost, onChange, setShowPost }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let zoneCode = data.zonecode;
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    onChange({ fullAddress, zoneCode });
    setShowPost(false);
  };

  return showPost ? (
    <div className="mt10 mb16">
      <DaumPostcode onComplete={handleComplete} width="400px" />
    </div>
  ) : (
    <></>
  );
};

export default Address;
