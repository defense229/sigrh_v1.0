import React from 'react';
import { ISvg } from '../../services/libs';

function SvgPlusDetail(props: ISvg) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="4 4 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="36" height="36" rx="18" fill="#EEF2FA" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.3334 6.3335H13.3334C12.05 6.3335 11 7.3835 11 8.66683V22.6668C11 23.9502 12.05 25.0002 13.3334 25.0002H27.3334C28.6167 25.0002 29.6667 23.9502 29.6667 22.6668V8.66683C29.6667 7.3835 28.6167 6.3335 27.3334 6.3335ZM7.50004 11.0002C6.85837 11.0002 6.33337 11.5252 6.33337 12.1668V27.3335C6.33337 28.6168 7.38337 29.6668 8.66671 29.6668H23.8334C24.475 29.6668 25 29.1418 25 28.5002C25 27.8585 24.475 27.3335 23.8334 27.3335H9.83337C9.19171 27.3335 8.66671 26.8085 8.66671 26.1668V12.1668C8.66671 11.5252 8.14171 11.0002 7.50004 11.0002ZM21.5 16.8335H25C25.6417 16.8335 26.1667 16.3085 26.1667 15.6668C26.1667 15.0252 25.6417 14.5002 25 14.5002H21.5V11.0002C21.5 10.3585 20.975 9.8335 20.3334 9.8335C19.6917 9.8335 19.1667 10.3585 19.1667 11.0002V14.5002H15.6667C15.025 14.5002 14.5 15.0252 14.5 15.6668C14.5 16.3085 15.025 16.8335 15.6667 16.8335H19.1667V20.3335C19.1667 20.9752 19.6917 21.5002 20.3334 21.5002C20.975 21.5002 21.5 20.9752 21.5 20.3335V16.8335Z"
        fill="#2E5AAC"
      />
    </svg>
  );
}

export default SvgPlusDetail;