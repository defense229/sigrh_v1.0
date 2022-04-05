import React, { ReactElement } from 'react';
import SvgEmpty from '../../Svgs/SvgEmpty';
import Flex from '../Flex/Flex';

export interface IEmptyState {
  children: string | ReactElement;
}

const EmptyState = ({ children }: IEmptyState) => {
  return (
    <Flex justify="center" items="center" direction="col">
      <SvgEmpty />
      <div>{children}</div>
    </Flex>
  );
};

export default EmptyState;
