import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SvgClose from '../Svgs/SvgClose';
import Flex from '../Utils/Flex/Flex';
import { IModal } from './modal.types';

function Modal({
  title = 'Title',
  open = false,
  onClose = () => {},
  children,
}: IModal) {
  const container = document.getElementById('portal');

  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (container && isOpen)
    return createPortal(
      <div className="modal">
        <div className="content">
          <Flex className="mb-12" justify="between" items="center">
            <div className="title">{title}</div>
            <div className="cursor-pointer">
              <SvgClose onClick={handleClose} />
            </div>
          </Flex>
          <div className="children">{children}</div>
        </div>
      </div>,
      container
    );
  return null;
}

export default Modal;
