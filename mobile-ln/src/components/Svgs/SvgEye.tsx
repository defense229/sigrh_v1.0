import React from 'react';
import { ISvg } from '../../services/libs';

function SvgEye(props: ISvg & { color?: string }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_562_1016)">
        <path
          d="M11.999 15.4999C13.6558 15.4999 14.999 14.1568 14.999 12.4999C14.999 10.8431 13.6558 9.49993 11.999 9.49993C10.3421 9.49993 8.99899 10.8431 8.99899 12.4999C8.99899 14.1568 10.3421 15.4999 11.999 15.4999Z"
          fill={props.color ? props.color : '#085A03'}
        />
        <path
          d="M18.5062 7.11774C16.4568 5.71243 14.2635 4.99993 11.9877 4.99993C9.93977 4.99993 7.94337 5.6093 6.05384 6.80368C4.14837 8.01071 2.2804 10.2031 0.748993 12.4999C1.98743 14.5624 3.68149 16.6831 5.44587 17.899C7.46993 19.2931 9.67071 19.9999 11.9877 19.9999C14.2846 19.9999 16.4807 19.2935 18.5174 17.9004C20.3104 16.6718 22.0166 14.554 23.249 12.4999C22.0124 10.4641 20.3006 8.34868 18.5062 7.11774ZM11.999 16.9999C11.109 16.9999 10.2389 16.736 9.49893 16.2415C8.7589 15.7471 8.18213 15.0443 7.84153 14.222C7.50094 13.3997 7.41183 12.4949 7.58546 11.622C7.75909 10.7491 8.18768 9.94728 8.81701 9.31795C9.44635 8.68861 10.2482 8.26003 11.1211 8.08639C11.994 7.91276 12.8988 8.00188 13.7211 8.34247C14.5433 8.68306 15.2461 9.25984 15.7406 9.99986C16.2351 10.7399 16.499 11.6099 16.499 12.4999C16.4976 13.693 16.0231 14.8368 15.1795 15.6804C14.3358 16.524 13.192 16.9986 11.999 16.9999Z"
          fill={props.color ? props.color : '#085A03'}
        />
      </g>
      <defs>
        <clipPath id="clip0_562_1016">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(-0.00100708 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgEye;
