
export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// object will be subject to JSON.stringify
type RequestBody =
  | File
  | string
  | URLSearchParams
  | FormData
  | object
  | undefined;

export const defaultHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

const buildPayload = (
  method: string,
  body: RequestBody,
  headers = {}
): RequestInit => {
  let payload: RequestInit = {
    // Include cookies in the request. See https://github.com/github/fetch#sending-cookies
    credentials: 'include',
    headers: {
      ...defaultHeaders(),
      ...headers
    },
    method
  };

  if (body) {
    payload =
      typeof body === 'object'
        ? { ...payload, body: JSON.stringify(body) }
        : { ...payload, body };
  }

  return payload;
};

const baseApiUrl =
  // eslint-disable-next-line no-undef
  process.env.REACT_APP_API_BASE_ENDPOINT || 'http://localhost:3000';

class Api {
  public static get(path: string, headers: object = {}) {
    const payload = buildPayload(METHODS.GET, undefined, headers);
    return fetch(`${baseApiUrl}${path}`, payload);
  }

  public static doFetch(path: string, body: RequestBody = {}, method: METHODS) {
    switch (method) {
      case METHODS.POST:
        return Api.post(path, body);
      case METHODS.GET:
        return Api.get(path);
      case METHODS.PUT:
        return Api.put(path, body);
      case METHODS.DELETE:
        return Api.delete(path, body);
      default:
        return Api.patch(path, body);
    }
  }

  static post(path: string, body: RequestBody = {}) {
    const payload = buildPayload(METHODS.POST, body);
    return fetch(`${baseApiUrl}${path}`, payload);
  }

  static put(path: string, body: RequestBody = {}) {
    const payload = buildPayload(METHODS.PUT, body);
    return fetch(`${baseApiUrl}${path}`, payload);
  }

  static delete(path: string, body: RequestBody = {}) {
    const payload = buildPayload(METHODS.DELETE, body);
    return fetch(`${baseApiUrl}${path}`, payload);
  }

  static patch(path: string, body: RequestBody = {}) {
    const payload = buildPayload(METHODS.PATCH, body);
    return fetch(`${baseApiUrl}${path}`, payload);
  }
}

export default Api;
