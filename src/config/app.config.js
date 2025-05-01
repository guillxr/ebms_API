require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const config = {
    development: require('./app.dev'),
    production: require('./app.prod')
};

module.exports = config[env];
