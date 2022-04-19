import { useEffect } from 'react';

export function useClickAwayListener(ref: any, cb: any) {
  useEffect(() => {
    function listener($event: any) {
      if (ref && ref.current && !ref.current.contains($event.target)) {
        cb();
      }
    }
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [ref, cb]);
}
