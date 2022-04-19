import React from 'react';
import { ISvg } from '../../services/libs';

function SvgPencilCircle(props: ISvg) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#FBECDA" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7517 8.52623C16.9645 8.73896 16.9645 9.0826 16.7517 9.29532L15.7536 10.2935L13.7081 8.24805L14.7063 7.24987C14.8082 7.14773 14.9465 7.09033 15.0908 7.09033C15.2351 7.09033 15.3735 7.14773 15.4754 7.24987L16.7517 8.52623ZM7.0918 16.6371V14.9789C7.0918 14.9025 7.11907 14.8371 7.17362 14.7825L13.1245 8.83163L15.17 10.8771L9.21362 16.828C9.16452 16.8825 9.09362 16.9098 9.02271 16.9098H7.36452C7.2118 16.9098 7.0918 16.7898 7.0918 16.6371Z"
        fill="#FF8600"
      />
    </svg>
  );
}

export default SvgPencilCircle;
