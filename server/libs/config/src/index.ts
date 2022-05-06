export const mode = 'prod';
const _config = {
  dev: {
    api_url: {
      qrcode_generator: 'http://localhost:7002/api/v1/qrcodes/',
      score_manager: 'http://localhost:7003/api/v1/',
      report: 'http://localhost:7004/api/v1/',
    },
    db_name: 'defrecrut_test',
  },
  prod: {
    api_url: {
      qrcode_generator: 'https://api-qrcodes.defense.bj/api/v1/qrcodes/',
      score_manager: 'https://api-scores.defense.bj/api/v1/',
      report: 'https://api-reports/api/v1/'
    }, 
    db_name: 'defrecrut_test'
  },
};

export const config = _config[mode];
