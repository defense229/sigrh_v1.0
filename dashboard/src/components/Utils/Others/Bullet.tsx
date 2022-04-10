import React from 'react';

type Props = {
  color?: string;
  radius?: number;
};

function Bullet({ color = 'white', radius = 6 }: Props) {
  return (
    <div
      className="radius-full"
      style={{
        backgroundColor: color,
        width: radius + 'px',
        height: radius + 'px',
      }}
    ></div>
  );
}

export default Bullet;
