import React, { HTMLAttributes } from 'react';
import { CommonElement } from '../../../services/libs';

export interface IContainer extends HTMLAttributes<HTMLElement> {
  width?: string;
  children: CommonElement;
}

const Container = ({ width = '90%', children, ...props }: IContainer) => {
  return (
    <div {...props} style={{ ...props.style, width, margin: 'auto' }}>
      {children}
    </div>
  );
};

export default Container;
