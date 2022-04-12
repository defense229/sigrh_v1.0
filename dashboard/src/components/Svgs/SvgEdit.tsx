import React from 'react';
import { ISvg } from '../../services/libs';

function SvgEdit(props: ISvg) {
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
        d="M20.1262 12.2167C19.6927 12.2167 19.3422 12.5635 19.3422 12.9925V19.4082C19.3422 19.9877 18.8579 20.4485 18.2767 20.4485H4.64283C4.05708 20.4485 3.56817 19.9877 3.56817 19.4082V5.55007C3.56817 4.97055 4.05708 4.52337 4.64283 4.52337H9.9285C10.3621 4.52337 10.7126 4.17658 10.7126 3.74765C10.7126 3.31872 10.3621 2.97192 9.9285 2.97192H4.64283C3.19458 2.97192 2 4.11726 2 5.55007V19.4082C2 20.841 3.19458 22 4.64283 22H18.2767C19.725 22 20.9103 20.8455 20.9103 19.4082V12.9925C20.9103 12.5681 20.5598 12.2167 20.1262 12.2167Z"
        fill="#0185FF"
      />
      <path
        d="M20.0894 2.64339C19.6789 2.23272 19.1347 2.00456 18.5535 2C17.9724 2 17.4235 2.21903 17.013 2.62971L9.96546 9.6021C9.70256 9.8622 9.51346 10.1862 9.41199 10.5375L8.18512 14.836C8.10672 15.1097 8.18512 15.4018 8.39268 15.6026C8.54027 15.744 8.7386 15.8216 8.94154 15.8216C9.01995 15.8216 9.09835 15.8125 9.17215 15.7851L13.397 14.4983C13.7337 14.3979 14.0427 14.2108 14.2918 13.9644L21.367 6.96464C22.2064 6.13415 22.2111 4.78348 21.3808 3.94387L20.0894 2.64339ZM16.5841 5.24892L18.7149 7.40269L18.1938 7.91832L16.0629 5.76454L16.5841 5.24892ZM13.1802 12.8738C13.111 12.9423 13.028 12.9925 12.9312 13.0198L10.0808 13.8868L10.9156 10.9573C10.9433 10.8615 10.9986 10.7702 11.0678 10.6972L14.9467 6.85968L17.0776 9.01346L13.1802 12.8738ZM20.2601 5.8695L19.8219 6.30299L17.691 4.14921L18.1154 3.73397C18.2307 3.61989 18.3783 3.56514 18.5397 3.56514C18.5397 3.56514 18.5397 3.56514 18.5443 3.56514C18.7057 3.56514 18.8579 3.62446 18.9686 3.73854L20.2601 5.03901C20.4907 5.26717 20.4907 5.64134 20.2601 5.8695Z"
        fill="#0185FF"
      />
    </svg>
  );
}

export default SvgEdit;