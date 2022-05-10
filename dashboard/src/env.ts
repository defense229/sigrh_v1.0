export const mode = 'dev';
const _config = {
  dev: {
    api_url: {
      sigrh: 'http://localhost:7000/api/v2/',
      defrecrutLn: 'http://localhost:7006/api/v1/',
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
    api_url: {
      sigrh: 'https://api-defrecrut-core.defense.bj/api/v2/',
      defrecrutLn: 'https://api-defrecrut-core-special.defense.bj/api/v1/',
      ws: 'https://api-defrecrut-core.defense.bj/',
    },
  },
};

export const config = _config[mode];
