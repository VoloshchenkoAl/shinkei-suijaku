import querystring from 'querystring';

type Data = {
  [key: string]: any;
};

type Headers = {
  [key: string]: string;
};

interface Request {
  url: string;
  method: 'GET' | 'POST';
  query?: string | any;
  data?: Data;
  headers?: Headers;
}

interface FetchConfig {
  method: string;
  headers: Headers;
  body?: string;
}

function makeUrl(url: string, query?: string | any): string {
  if (!query) {
    return url;
  }

  let parseQuery = null;
  if (typeof query === 'string') {
    parseQuery = querystring.parse(query);
  } else {
    parseQuery = query;
  }
  const normalizeQuery = querystring.stringify(parseQuery);

  return `${url}?${normalizeQuery}`;
}

function makeConfig(method: string, data?: Data, headers?: Headers) {
  const config: FetchConfig = {
    method,
    headers: {},
  };

  if (typeof headers === 'object') {
    config.headers = headers;
  }

  if (typeof data === 'object') {
    config.body = JSON.stringify(data);
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
}

export async function makeRequest(params: Request): Promise<any> {
  const { url, method, query, data, headers } = params;
  const requestUrl = makeUrl(url, query);
  const requestConfig = makeConfig(method, data, headers);

  const resp = await fetch(requestUrl, requestConfig);

  if (!resp.ok) {
    throw new Error(
      `${resp.statusText} ${resp.status} for url ${url}`,
    );
  }

  const respData = await resp.json();

  return respData;
}
