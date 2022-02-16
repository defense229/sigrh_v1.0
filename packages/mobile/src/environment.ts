const mode = 'prod';

const server_url = {
  dev: 'http://localhost:5002/api/',
  prod: 'https://b07e-197-234-223-250.ngrok.io/api/'
};

export const SERVER_URL = server_url[mode];