import { useRecoilState } from 'recoil';
import { queryParams } from '../providers/store/atoms/query-params.atom';

function useChangePageSize() {
  const [params, setParams] = useRecoilState(queryParams);
  const changePageSize = (value: number) => {
    setParams({ ...params, limit: value });
  };
  return changePageSize;
}

export default useChangePageSize;
