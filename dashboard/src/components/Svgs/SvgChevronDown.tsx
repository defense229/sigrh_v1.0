import React from 'react';
import { ISvg } from '../../services/libs';

const SvgChevronDown = (props: ISvg) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        d='M5.58749 7.4999C5.43144 7.65559 5.34375 7.86697 5.34375 8.0874C5.34375 8.30783 5.43144 8.51921 5.58749 8.6749L9.41249 12.4999C9.73749 12.8249 10.2625 12.8249 10.5875 12.4999L14.4125 8.6749C14.7375 8.3499 14.7375 7.8249 14.4125 7.4999C14.0875 7.1749 13.5625 7.1749 13.2375 7.4999L9.99582 10.7332L6.76249 7.4999C6.43749 7.1749 5.90415 7.18324 5.58749 7.4999Z'
        fill='white'
      />
    </svg>
  );
};

export default SvgChevronDown;
