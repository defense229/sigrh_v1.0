const mode = 'prod';

const server_url = {
  dev: 'http://localhost:5002/api/',
  prod: 'https://sigrh-backend-dot-defrecrut.ew.r.appspot.com/api/'
};

export const SERVER_URL = server_url[mode];