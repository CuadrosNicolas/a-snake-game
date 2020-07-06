/**
 *
 * HTTP UTILS FUNCTION
 */

/**
 *
 * @param request
 */
function http<T>(request: RequestInfo): Promise<T> {
  return fetch(
    request).then((response) => {
      if (response.status !== 200) {
        return response.json().then(res => { throw res });
      } else {
        return response.json();
      }
    });
}

/**
 *
 * @param path
 * @param args
 */
export function get<T>(
  path: string,
  args: RequestInit = { method: 'get' },
): Promise<T> {
  return http<T>(new Request(path, args));
};

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

/**
 *
 * @param path
 * @param body
 * @param args
 */
export function post<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'POST', body: JSON.stringify(body),
    headers: myHeaders, redirect: 'follow'
  },
): Promise<T> {
  return http<T>(new Request(path, args));
};

/**
 *
 * @param path
 * @param body
 * @param args
 */
export function del<T>(
  path: string,
  body?: any,
): Promise<T> {
  const args: RequestInit = {
    method: 'DELETE',
    headers: myHeaders, redirect: 'follow'
  };
  if (body) {
    args.body = JSON.stringify(body);
  }
  return http<T>(new Request(path, args));
};

/**
 *
 * @param path
 * @param body
 * @param args
 */
export function put<T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'put', body: JSON.stringify(body) },
): Promise<T> {
  return http<T>(new Request(path, args));
};

export const Http = {
  get, post, put, del,
};
