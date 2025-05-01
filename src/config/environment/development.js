module.exports = {
  appName: 'HemoSync [DEV]',
  env: 'development',
  port: process.env.PORT || 3000,
  debug: true,
  logging: 'verbose',
  database: {
    url: process.env.DB_URI || null,
  },
};
