import React from 'react';
import { TColors } from '../../services/types';

export interface IProgressBar {
  color?: TColors;
  value: number;
  height?: number;
}

function ProgressBar({
  color = 'primary',
  value = 0,
  height = 7,
}: IProgressBar) {
  return (
    <div
      className="bg-gray relative"
      style={{ height: height + 'px', borderRadius: '20px' }}
    >
      <div
        className={`bg-${color} absolute`}
        style={{
          height: height + 'px',
          borderRadius: '20px',
          width: value + 'px',
          left: '0px',
          top: '0px',
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
