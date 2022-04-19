import React from 'react';
import { CommonElement } from '../../../services/libs';

type Props = {
  cond: boolean;
  elseComponent?: CommonElement;
  children: CommonElement;
};

function Condition({
  cond = true,
  elseComponent = <></>,
  children = <></>,
}: Props) {
  if (!cond) return <>{elseComponent}</>;
  return <>{children}</>;
}

export default Condition;
