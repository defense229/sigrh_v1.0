import React, { useCallback, useRef, useState } from 'react';
import { useClickAwayListener } from '../../services/hooks/useClickAwayListener';
import { IDropdown } from './dropdown.types';

function Dropdown({ children, dropdown }: IDropdown) {
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  useClickAwayListener(containerRef, () => setOpen(false));

  return (
    <div className="select" ref={containerRef}>
      <div onClick={handleOpen}>{children}</div>
      {open && <div className="dropdown">{dropdown}</div>}
    </div>
  );
}

export default Dropdown;
