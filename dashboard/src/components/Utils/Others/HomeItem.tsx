import React from 'react';
import SvgPlusDetail from '../../Svgs/SvgPlusDetail';
import Flex from '../Flex/Flex';

export interface IHomeItem {
  title: string;
  description: string;
  url?: string;
}

function HomeItem({ title, description }: IHomeItem) {
  return (
    <Flex gap="10px">
      <SvgPlusDetail />
      <div>
        <div className="fs-16 semi-bold pt-3">{title}</div>
        <div className="fs-14">{description}</div>
      </div>
    </Flex>
  );
}

export default HomeItem;
