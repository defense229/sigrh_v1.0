import React from 'react';
import { CommonElement } from '../../../services/libs';

type Props = {
  title: string;
  children: CommonElement;
};

function ConfigCard({ title, children }: Props) {
  return (
    <div className="bg-white radius-6 my-10 px-5 py-3">
      <div className="fs-14 bold my-2">{title}</div>
      <hr />
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default ConfigCard;
