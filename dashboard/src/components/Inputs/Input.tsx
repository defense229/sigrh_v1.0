import React, { useEffect, useMemo, useRef } from 'react';
import Flex from '../Utils/Flex/Flex';
import { IInput } from './input.types';

const Input = ({
  label = null,
  color = 'primary',
  actions = null,
  ...props
}: IInput) => {
  // const ref = useRef<any>(null);

  const css = useMemo(() => {
    return `input input-${color}`;
  }, [color]);

  // useEffect(() => {
  //   if (ref && ref.current && props.auf) {
  //     console.log(ref);
  //   }
  // }, []);

  return (
    <div className="w-full">
      <label className="semi-bold" htmlFor="">
        {label}
        {props.required && <span style={{ color: 'red' }}> * </span>}
      </label>
      <div className={css}>
        <Flex items="center">
          <>{actions && actions.left ? actions.left : ''}</>
          <input autoFocus={props.autoFocus} type="text" {...props} />
          <>{actions && actions.right ? actions.right : ''}</>
        </Flex>
      </div>
    </div>
  );
};

export default Input;
