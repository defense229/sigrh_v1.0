import React from 'react';
import { ISvg } from '../../services/libs';

function SvgMore(props: ISvg) {
  return (
    <svg
      width="18"
      height="4"
      viewBox="0 0 18 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="2" cy="2" r="2" fill="#394452" />
      <circle cx="9" cy="2" r="2" fill="#394452" />
      <circle cx="16" cy="2" r="2" fill="#394452" />
    </svg>
  );
}

export default SvgMore;
