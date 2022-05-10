import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface IFetch {
  url: string;
  params?: Record<string, any>;
  headers?: Record<string, any>;
}

export function useFetch<T>(options: IFetch) {
  const [_options, setOptions] = useState(options);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<T>();

  useEffect(() => {
    console.log('reload');
    if (_options.url !== '') {
      axios
        .get(_options.url, {
          params: _options.params,
          headers: _options.headers,
        })
        .then((response: AxiosResponse) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [_options.url, _options.headers, _options.params]);

  function reload() {
    setOptions((_options) => ({ ..._options, url: '' }));
    setOptions((_options) => ({ ..._options, url: options.url }));
  }

  return [loading, data, error, setData, reload];
}
