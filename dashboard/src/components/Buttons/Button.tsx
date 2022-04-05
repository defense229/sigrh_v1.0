import React, { HTMLAttributes, ReactElement, useMemo } from 'react';
import { TColors } from '../../services/types/style.types';
import Spinner from '../Progress/Spinner';
import Flex from '../Utils/Flex/Flex';

export interface IButton extends HTMLAttributes<HTMLButtonElement> {
  color?: TColors;
  loading?: boolean;
  expand?: boolean;
  outlined?: boolean;
  children?: string | ReactElement | ReactElement[];
  disabled?: boolean;
  type?: 'button' | 'submit';
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
  return base;
};

function Button({
  color = 'primary',
  loading = false,
  expand = false,
  outlined = false,
  disabled = false,
  type = 'submit',
  children,
  ...props
}: IButton) {
  const css = useMemo(() => {
    return _getClass({ color, expand, outlined });
  }, [color, expand, outlined]);
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
        children
      )}
    </button>
  );
}

export default Button;
