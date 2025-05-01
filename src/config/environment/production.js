module.exports = {
  appName: 'HemoSync API',
  env: 'production',
  port: 5000,
  debug: false,
  logging: 'error',
  database: {
    url: process.env.DB_URI || null,
  },
};
