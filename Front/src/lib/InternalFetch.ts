const baseUrl = 'http://localhost:3030';

export default function internalFetch(method: string, url: string, data?: any): Promise<Response> {
  let settings: RequestInit = {
    method,
    credentials: 'include',
  };

  if (method === 'GET' || method === 'DELETE') {
    return fetch(`${baseUrl}/${url}`, settings);
  }

  settings.headers = {
    'Content-Type': 'application/json',
  };

  if (data) {
    settings.body = JSON.stringify(data);
  }

  return fetch(`${baseUrl}/${url}`, settings);
}