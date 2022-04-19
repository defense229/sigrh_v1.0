import React from 'react';
import { ISvg } from '../../services/libs';

function SvgArrowDown(props: ISvg) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.57707 10.9788L10.6269 15.4905C11.3873 16.1698 12.6156 16.1698 13.376 15.4905L18.4258 10.9788C19.6541 9.88133 18.7767 8 17.0415 8H6.94188C5.20662 8 4.34874 9.88133 5.57707 10.9788Z"
        fill="#858C94"
      />
    </svg>
  );
}

export default SvgArrowDown;
