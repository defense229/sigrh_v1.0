import React from 'react';
import { STATUS_MATCHING, _STATUS_COLORS } from '../../../services/libs';
import { TCenterStatus, TStatusExam } from '../../../services/types';
import { TStatusCandidate } from '../../../services/types/candidates.types';
import Flex from '../Flex/Flex';
import Bullet from './Bullet';

type Props = {
  value?: TStatusExam | TStatusCandidate | TCenterStatus;
};

function StatusDisplay({ value = 'NEW' }: Props) {
  return (
    <Flex
      className="status-display"
      items="center"
      justify="center"
      gap="10px"
      style={{ backgroundColor: _STATUS_COLORS[value] }}
    >
      <Bullet />
      <div className="text-white semi-bold">{STATUS_MATCHING[value]}</div>
    </Flex>
  );
}

export default StatusDisplay;
