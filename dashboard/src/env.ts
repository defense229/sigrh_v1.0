export const mode = 'dev';
const _config = {
  dev: {
    api_url: {
      sigrh: 'http://localhost:7000/api/v2/',
    },
  },
  prod: {
    db_name: 'defrecrut',
  },
};

export const config = _config[mode];
