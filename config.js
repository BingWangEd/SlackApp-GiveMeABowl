const dotenv = require('dotenv')
const ENV = process.env.NODE_ENV || 'development'

if (ENV === 'development') dotenv.config();

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
}

module.exports = (key) => {
  if (!key) return config;
  console.log('key: ', config[key]);

  return config[key]
}