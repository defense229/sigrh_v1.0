import React from 'react';
import { ISvg } from '../../services/libs';

function SvgClose(props: ISvg & { color?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L23.7071 22.2929C24.0976 22.6834 24.0976 23.3166 23.7071 23.7071C23.3166 24.0976 22.6834 24.0976 22.2929 23.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z"
        fill={props.color ? props.color : 'black'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.7071 8.29289C24.0976 8.68342 24.0976 9.31658 23.7071 9.70711L9.70711 23.7071C9.31658 24.0976 8.68342 24.0976 8.29289 23.7071C7.90237 23.3166 7.90237 22.6834 8.29289 22.2929L22.2929 8.29289C22.6834 7.90237 23.3166 7.90237 23.7071 8.29289Z"
        fill={props.color ? props.color : 'black'}
      />
    </svg>
  );
}

export default SvgClose;
