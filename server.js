require('module-alias/register');

const config = require('@config/app.config');
const app = require('@src/app');

app.listen(config.port, () => {
  console.log(`${config.appName} works at port ${config.port} [${config.env}]`);
});
