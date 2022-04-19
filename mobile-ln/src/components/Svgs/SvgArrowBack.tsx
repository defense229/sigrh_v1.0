import React from 'react';
import { ISvg } from '../../services/libs';

function SvgArrowBack(props: ISvg) {
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
        d="M11.4375 18.7499L4.6875 11.9999L11.4375 5.24994"
        stroke="#808080"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.625 11.9999H19.3125"
        stroke="#808080"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgArrowBack;
