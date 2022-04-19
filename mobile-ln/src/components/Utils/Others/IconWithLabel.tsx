import React, { HTMLAttributes, ReactElement } from 'react';
import Flex from '../Flex/Flex';

export interface IIconLabel extends HTMLAttributes<HTMLElement> {
  icon: ReactElement;
  label: string;
}

function IconWithLabel({ icon, label, ...props }: IIconLabel) {
  return (
    <div {...props}>
      <Flex items="center" gap="12px">
        <div>{icon}</div>
        <div className="fs-14 semi-bold">{label}</div>
      </Flex>
    </div>
  );
}

export default IconWithLabel;
