import React, { HTMLAttributes, ReactElement, useMemo } from 'react';
import { TColors } from '../../services/types';
import Spinner from '../Progress/Spinner';
import Flex from '../Utils/Flex/Flex';

export interface IButton extends HTMLAttributes<HTMLButtonElement> {
  color?: TColors;
  loading?: boolean;
  expand?: boolean;
  outlined?: boolean;
  children?: string | ReactElement;
  disabled?: boolean;
  type?: 'button' | 'submit';
  icon?: ReactElement | null;
  className?: string;
}

const _getClass = (options: IButton) => {
  let base = `button border-${options.color} semi-bold`;

  if (options.outlined) {
    base += ` bg-transparent text-${options.color}`;
  } else {
    if (options.color === 'light' || options.color === 'white') {
      base += ' text-black';
    } else {
      base += ' text-white';
    }
    base += ` bg-${options.color}`;
  }

  if (options.expand) {
    base += ' w-full';
  }

  if (options.className && options.className.length > 0) {
    base += ' ' + options.className;
  }
  return base;
};

function Button({
  color = 'primary',
  loading = false,
  expand = false,
  outlined = false,
  disabled = false,
  type = 'submit',
  icon = null,
  className = '',
  children,
  ...props
}: IButton) {
  const css = useMemo(() => {
    return _getClass({ color, expand, outlined, className });
  }, [color, expand, outlined, className]);
  return (
    <button
      type={type}
      className={css}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Flex items="center" justify="center" gap="7px">
          <Spinner />
          <div>Charg...</div>
        </Flex>
      ) : (
        <div>
          {icon ? (
            <Flex items="center" gap="10px">
              {icon}
              <div>{children}</div>
            </Flex>
          ) : (
            children
          )}
        </div>
      )}
    </button>
  );
}

export default Button;
