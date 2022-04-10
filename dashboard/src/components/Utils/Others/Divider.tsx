import React from 'react';

type Props = {
  width?: string;
  color?: string;
};

function Divider({ width = '1px', color = 'rgba(0, 0, 0, 0.15)' }: Props) {
  return (
    <div
      style={{
        width: width,
        backgroundColor: color,
      }}
    />
  );
}

export default Divider;
