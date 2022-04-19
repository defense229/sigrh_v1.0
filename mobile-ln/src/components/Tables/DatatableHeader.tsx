import React, { memo } from 'react';
import Select from '../Dropdowns/Select';
import Search from '../Inputs/Search';
import Flex from '../Utils/Flex/Flex';
import Paginator from './Paginator';
import { IPaginator } from './table.types';

function DatatableHeader({
  limit = 10,
  skip = 0,
  total = 0,
  onNext,
  onPrevious,
  onSearch = (v) => v,
  onPageSizeChanged = (v) => v,
}: IPaginator) {
  return (
    <Flex items="center" justify="between" className="mb-10 dt-card py-4 px-10">
      <div style={{ width: '275px' }}>
        <Search onSearch={onSearch} />
      </div>
      <Flex items="center" gap="20px">
        <div style={{ width: '70px' }}>
          <Select
            placeholder="Elts/page"
            values={['5', '10', '25', '100']}
            onChange={(v: string) => onPageSizeChanged(Number(v))}
          />
        </div>
        <Paginator
          limit={limit}
          skip={skip}
          total={total}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      </Flex>
    </Flex>
  );
}

export default memo(DatatableHeader);
