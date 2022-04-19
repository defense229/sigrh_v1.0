import React, { useEffect, useState } from 'react';
import SvgCheck from '../Svgs/SvgCheck';

export interface ICheckbox {
  checked?: boolean;
  onChange?: (x: boolean) => void;
}

function Checkbox({ checked, onChange = (x: boolean) => {} }: ICheckbox) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div
      className={isChecked ? 'checkbox checkbox-active' : 'checkbox'}
      onClick={handleClick}
    >
      {isChecked && <SvgCheck />}
    </div>
  );
}

export default Checkbox;
