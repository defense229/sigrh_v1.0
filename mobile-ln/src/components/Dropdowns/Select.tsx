import React, { useEffect, useRef, useState } from 'react';
import { useClickAwayListener } from '../../services/hooks/useClickAwayListener';
import Input from '../Inputs/Input';
import SvgArrowDown from '../Svgs/SvgArrowDown';
import { ISelect } from './dropdown.types';

function Select({
  values = [],
  display = 'name',
  onChange = () => {},
  label = null,
  required = false,
  placeholder = '',
}: ISelect) {
  const containerRef = useRef(null);
  const data = useRef(values);
  const [_label, setLabel] = useState('');
  const [open, setOpen] = useState(false);

  useClickAwayListener(containerRef, () => setOpen(false));

  useEffect(() => {
    data.current = values;
  }, [values]);

  const handleSelection = (value: string | any) => {
    if (typeof value === 'string') {
      setLabel(value);
    } else {
      setLabel(value[display]);
    }
    onChange(value);
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="select w-full" ref={containerRef}>
      <div onClick={handleOpen}>
        <Input
          label={label}
          required={required}
          placeholder={placeholder}
          contentEditable={false}
          value={_label}
          onChange={() => {}}
          actions={{ right: <SvgArrowDown /> }}
        />
      </div>
      {open && (
        <div className="dropdown">
          {data.current.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="py-4 px-4 select-item"
                onClick={() => handleSelection(item)}
              >
                {typeof item === 'string' ? item : item[display]}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Select;
