import React, { useMemo } from 'react';
import SvgArrowLeft from '../Svgs/SvgArrowLeft';
import SvgArrowRight from '../Svgs/SvgArrowRight';
import Flex from '../Utils/Flex/Flex';
import { IPaginator } from './table.types';

function Paginator({
  skip = 0,
  limit = 0,
  total = 0,
  onNext = () => {},
  onPrevious = () => {},
}: IPaginator) {
  const start = useMemo(() => skip + 1, [skip]);
  const end = useMemo(
    () => (skip + limit > total ? total : skip + limit),
    [skip, limit, total]
  );
  if (total === 0) return null;
  return (
    <Flex gap="30px" items="center">
      <div>
        {start}-{end > total ? total : end} sur {total}
      </div>
      <Flex gap="50px">
        <SvgArrowLeft
          className="cursor-pointer"
          onClick={() => {
            onPrevious();
          }}
        />
        <SvgArrowRight
          className="cursor-pointer"
          onClick={() => {
            onNext();
          }}
        />
      </Flex>
    </Flex>
  );
}

export default Paginator;
