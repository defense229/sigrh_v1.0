import React, { useState } from 'react';
import SvgEye from '../Svgs/SvgEye';
import Input from './Input';
import { IInput } from './input.types';

function Password({ color = 'primary', label = null, ...props }: IInput) {
  const [visibleText, setVisibleText] = useState(false);

  const toggle = () => {
    setVisibleText(!visibleText);
  };

  return (
    <Input
      label={label}
      color={color}
      actions={{ right: <SvgEye onClick={toggle} /> }}
      type={visibleText ? 'text' : 'password'}
      {...props}
    />
  );
}

export default Password;
