import React from 'react';
import { ITextArea } from './input.types';

function Textarea({ label = null, ...props }: ITextArea) {
  return (
    <div>
      <label htmlFor="">
        {label}
        {props.required && <span style={{ color: 'red' }}> * </span>}
      </label>
      <div className="input">
        <textarea {...props} rows={5} />
      </div>
    </div>
  );
}

export default Textarea;
