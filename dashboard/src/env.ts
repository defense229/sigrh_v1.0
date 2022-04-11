export const mode = 'dev';
const _config = {
  dev: {
    api_url: {
      sigrh: 'http://localhost:7000/api/v2/',
      ws: 'ws://localhost:7000/',
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
  },
};

export const config = _config[mode];
