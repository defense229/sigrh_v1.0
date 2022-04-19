import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { _getDefaultQueryParams } from '../libs';
import { queryParams } from '../providers/store/atoms/query-params.atom';

export function useSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const setParams = useSetRecoilState(queryParams);
  const handleSearch = (value: string) => {
    setIsSearching(true);
    setParams(() => _getDefaultQueryParams(value));
  };

  return { isSearching, handleSearch };
}
