import React from 'react';
import useStyle from '../../../services/hooks/useStyle';
import { IFlex } from './flex.types';

const Flex = ({
  justify = 'start',
  items = 'start',
  gap = '0px',
  direction = 'row',
  children,
  ...props
}: IFlex) => {
  const _props = useStyle(
    props,
    `flex justify-${justify} items-${items} flex-${direction}`,
    {
      gap,
    }
  );

  return <div {..._props}>{children}</div>;
};

export default Flex;
