import React from 'react';

type Props = {
  title: string;
  value: string;
};

function TitleValueDisplay({ title, value }: Props) {
  return (
    <div className="my-5">
      <div className="fs-14 semi-bold">{title}</div>
      <div className="fs-14 text-dark">{value}</div>
    </div>
  );
}

export default TitleValueDisplay;
