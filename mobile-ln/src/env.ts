export const mode = 'prod';
const _config = {
  dev: {
    api_url: {
      sigrh: 'http://localhost:7000/api/v2/',
      defrecrutLn: 'http://localhost:7006/api/v1/',
      ws: 'ws://localhost:7006/',
    },
  },
  staging: {
    api_url: {
      sigrh: 'http://localhost:3790/api/v2/',
      ws: 'ws://localhost:3790/',
    },
  },
  prod: {
    db_name: 'defrecrut',
    api_url: {
      sigrh: 'http://52.23.134.77:7006/api/v2/',
      defrecrutLn: 'http://52.23.134.77:7006/api/v1/',
      ws: 'ws://52.23.134.77:7006/',
    },
  },
};

export const config = _config[mode];
