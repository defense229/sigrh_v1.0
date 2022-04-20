import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SvgClose from '../Svgs/SvgClose';
import Flex from '../Utils/Flex/Flex';
import { IToast } from './modal.types';

function Toast({
  color = 'dark-gray',
  children,
  closable = true,
  icon = null,
  open = false,
  duration = 5,
  onClose = () => {},
  xpos = 'center',
  ypos = 'top',
}: IToast) {
  const [_open, setOpen] = useState(open);
  const container = document.getElementById('portal');

  useEffect(() => {
    setOpen(open);
    let timeout: any;
    if (open) {
      timeout = setTimeout(() => {
        setOpen(false);
        onClose();
      }, duration * 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [open, duration, onClose]);

  if (!_open) return null;

  if (container) {
    return createPortal(
      <div
        className={`toast ${ypos}-${xpos} bg-${color} ${
          _open ? 'fade-in' : 'fade-out'
        }`}>
        <Flex
          items='center'
          className='text-light py-5 pl-10 pr-5'
          gap='20px'
          style={{ borderRadius: '4px' }}>
          <>{icon}</>
          <div>{children}</div>
          <div className='box'>
            {closable && (
              <SvgClose
                color='white'
                onClick={() => {
                  setOpen(false);
                  onClose();
                }}
              />
            )}
          </div>
        </Flex>
      </div>,
      container
    );
  }

  return null;
}

export default Toast;
