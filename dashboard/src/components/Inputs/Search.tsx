import React from 'react';
import SvgSearch from '../Svgs/SvgSearch';
import Input from './Input';
import { IInput } from './input.types';

function Search(props: IInput) {
  return (
    <Input
      actions={{ left: <SvgSearch /> }}
      placeholder={props.placeholder ? props.placeholder : 'Rechercher'}
      {...props}
    />
  );
}

export default Search;
