import React from 'react';
import Flex from '../Flex/Flex';
import Frame from './Frame';

type Props = {
  icon: any;
  description: string;
  value: number;
};

function StatsFrame({ icon = null, description = '', value = 0 }: Props) {
  return (
    <Frame>
      <div className="m-3">
        <Flex items="center" gap="12px">
          {icon}
          <div>
            <div>{description}</div>
            <div className="fs-20 semi-bold">{value}</div>
          </div>
        </Flex>
      </div>
    </Frame>
  );
}

export default StatsFrame;
