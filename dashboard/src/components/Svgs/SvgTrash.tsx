import React from 'react';
import { ISvg } from '../../services/libs';

function SvgTrash(props: ISvg & { color?: string }) {
  return (
    <svg
      width='20'
      height='18'
      viewBox='0 0 20 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.5 4.83342C2.96024 4.83342 3.33333 5.20651 3.33333 5.66675V15.6667H16.6667V5.66675C16.6667 5.20651 17.0398 4.83342 17.5 4.83342C17.9602 4.83342 18.3333 5.20651 18.3333 5.66675V16.5001C18.3333 16.9603 17.9602 17.3334 17.5 17.3334H2.5C2.03976 17.3334 1.66667 16.9603 1.66667 16.5001V5.66675C1.66667 5.20651 2.03976 4.83342 2.5 4.83342Z'
        fill={props.color ? props.color : 'white'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 1.50008C0 1.03984 0.373096 0.666748 0.833333 0.666748H19.1667C19.6269 0.666748 20 1.03984 20 1.50008V5.66675C20 6.12699 19.6269 6.50008 19.1667 6.50008H0.833333C0.373096 6.50008 0 6.12699 0 5.66675V1.50008ZM1.66667 2.33341V4.83342H18.3333V2.33341H1.66667Z'
        fill={props.color ? props.color : 'white'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.5 9.00008C7.5 8.53984 7.8731 8.16675 8.33333 8.16675H11.6667C12.1269 8.16675 12.5 8.53984 12.5 9.00008C12.5 9.46032 12.1269 9.83342 11.6667 9.83342H8.33333C7.8731 9.83342 7.5 9.46032 7.5 9.00008Z'
        fill={props.color ? props.color : 'white'}
      />
    </svg>
  );
}

export default SvgTrash;
