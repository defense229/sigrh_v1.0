import { SERVER_URL } from './environment';

const jsonify = (method: string, body: any) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }
}

const http = {
  get: async (route: string) => await fetch(SERVER_URL + route).then(r => r.json()),
  post: async (route: string, data: any) => await fetch(SERVER_URL + route, jsonify('POST', data)).then(r => r.json()),
  put: async (route: string, data: any) => await fetch(SERVER_URL + route, jsonify('PUT', data)).then(r => r.json()),
  delete: async (route: string) => await fetch(SERVER_URL + route, { method: 'DELETE' }).then(r => r.json()),
};

export default http;