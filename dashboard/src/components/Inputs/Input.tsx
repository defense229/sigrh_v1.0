import React, { useMemo } from 'react';
import Flex from '../Utils/Flex/Flex';
import { IInput } from './input.types';

const Input = ({
  label = null,
  color = 'primary',
  actions = null,
  ...props
}: IInput) => {
  const css = useMemo(() => {
    return `input input-${color}`;
  }, [color]);

  return (
    <div className="w-full">
      <label htmlFor="">
        {label}
        {props.required && <span style={{ color: 'red' }}> * </span>}
      </label>
      <div className={css}>
        <Flex items="center">
          <>{actions && actions.left ? actions.left : ''}</>
          <input type="text" {...props} />
          <>{actions && actions.right ? actions.right : ''}</>
        </Flex>
      </div>
    </div>
  );
};

export default Input;
