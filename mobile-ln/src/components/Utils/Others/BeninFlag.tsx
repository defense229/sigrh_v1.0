import React, { HTMLAttributes } from 'react';

const getStyle = (color: string) => {
  return {
    backgroundColor: color,
    height: '7px',
  };
};

export interface IBeninFlag extends HTMLAttributes<HTMLElement> {
  height?: string;
}

function BeninFlag({ height = '7px', ...props }: IBeninFlag) {
  return (
    <div className="grid grid-cols-3-nr" {...props}>
      <div style={getStyle('green')}></div>
      <div style={getStyle('yellow')}></div>
      <div style={getStyle('red')}></div>
    </div>
  );
}

export default BeninFlag;
