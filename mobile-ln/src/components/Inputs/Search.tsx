import React, { useRef, useState } from 'react';
import SvgSearch from '../Svgs/SvgSearch';
import Input from './Input';
import { IInput } from './input.types';

function Search({
  onSearch = (v) => v,
  ...props
}: IInput & { onSearch?: (v: string) => void }) {
  const [value, setValue] = useState('');
  const _v = useRef('');

  const handleChange = (event: any) => {
    const _value = event.target.value;
    setValue(_value);
    _v.current = _value;

    setTimeout(() => {
      if (_value === _v.current) {
        onSearch(_value);
      }
    }, 1000);
  };

  return (
    <Input
      autoFocus
      actions={{ left: <SvgSearch /> }}
      placeholder={props.placeholder ? props.placeholder : 'Rechercher'}
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
}

export default Search;
