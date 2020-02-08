const MONGO_USERNAME = 'jai';
const MONGO_PASSWORD = 'rockstar';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT  = '27017';
const MONGO_DB = 'tasafe';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

module.exports = url
