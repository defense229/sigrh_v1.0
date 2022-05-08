const { execFileSync } = require('child_process');

const data = execFileSync('./deploy.sh');

console.log(data);
