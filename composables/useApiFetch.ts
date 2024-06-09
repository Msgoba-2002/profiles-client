import type { FetchKeys } from "../types/enums";

type FetchOptions = {
  headers?: Record<string, string>;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  key: FetchKeys;
  query?: Record<string, string | number>;
}

export const useApiFetch = async (url: string, options: FetchOptions) => {
  const config = useRuntimeConfig();
  const { backendUrl, apiDockerUrl } = config.public;

  let baseUrl = backendUrl;

  if (process.server) {
    baseUrl = apiDockerUrl;
    options.headers = {
      ...options.headers,
      ...useRequestHeaders(['cookie']),
    }
  }

  return useFetch(`${baseUrl}${url}`, {
    credentials: 'include',
    watch: false,
    ...options,
    headers: {
      'Accept': 'application/json',
      ...options.headers,
    }
  });
}