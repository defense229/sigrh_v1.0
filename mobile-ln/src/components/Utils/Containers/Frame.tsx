import React from 'react';
import { CommonElement } from '../../../services/libs';

type Props = {
  children: CommonElement;
};

function Frame({ children }: Props) {
  return <div className="radius-8 border-gray p-8">{children}</div>;
}

export default Frame;
