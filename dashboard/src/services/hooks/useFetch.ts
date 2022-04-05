import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface IFetch {
  url: string;
  params?: Record<string, any>;
  headers?: Record<string, any>;
}

export function useFetch<T>(options: IFetch) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<T>();

  useEffect(() => {
    axios
      .get(options.url, {
        params: options.params,
        headers: options.headers,
      })
      .then((response: AxiosResponse) => {
        setData([] as unknown as T);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [options.url, options.headers, options.params]);

  return [loading, data, error];
}
