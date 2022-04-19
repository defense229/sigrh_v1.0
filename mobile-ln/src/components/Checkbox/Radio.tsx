import React, { useEffect, useState } from 'react';

export interface ICheckbox {
  checked?: boolean;
  onChange?: (x: boolean) => void;
}

function Radio({ checked, onChange = (x: boolean) => {} }: ICheckbox) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div className="radio" onClick={handleClick}>
      {isChecked && <div className="radio-active" />}
    </div>
  );
}

export default Radio;
