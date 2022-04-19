import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { _getDefaultQueryParams } from '../libs';
import { queryParams } from '../providers/store/atoms/query-params.atom';

export function useQueryParams(value: string = '') {
  const [params, setParams] = useRecoilState(queryParams);

  const reload = useCallback(() => {
    setParams(() => _getDefaultQueryParams(value));
  }, [setParams, value]);

  useEffect(() => {
    reload();
    // eslint-disable-next-line
  }, [reload]);

  return { params, reload };
}
