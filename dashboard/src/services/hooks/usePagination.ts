import { useRecoilState } from 'recoil';
import { queryParams } from '../providers/store/atoms/query-params.atom';
import { IQueryParam } from '../types';

export function usePagination(value: any) {
  const [params, setParams] = useRecoilState(queryParams);
  const handleNext = () => {
    if (params.skip + params.limit < value.total) {
      setParams((params: IQueryParam) => ({
        ...params,
        skip: params.skip + params.limit,
      }));
    }
  };

  const handlePrevious = () => {
    if (params.skip > 0) {
      setParams((params: IQueryParam) => ({
        ...params,
        skip: params.skip - params.limit < 0 ? 1 : params.skip - params.limit,
      }));
    }
  };

  return { handleNext, handlePrevious };
}
