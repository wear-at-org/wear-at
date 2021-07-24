import React, { memo, useCallback } from 'react';
import DaumPostcode from 'react-daum-postcode';

const Address = ({ showPost, onChange, setShowPost }) => {
  const handleComplete = useCallback(
    (data) => {
      let fullAddress = data.address;
      let extraAddress = '';
      let zipCode = data.zonecode;
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }
      setShowPost(false);
      onChange({ address: fullAddress, zipCode });
    },
    [onChange, setShowPost],
  );

  return showPost ? (
    <div className="mt10 mb16">
      <DaumPostcode onComplete={handleComplete} width="400px" height="480px" style={{ border: '1px solid #d4d4d4' }} />
    </div>
  ) : (
    <></>
  );
};

export default memo(Address);
