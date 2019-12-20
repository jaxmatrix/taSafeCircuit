const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MONGO_USERNAME = 'jai';
const MONGO_PASSWORD = 'rockstar';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT  = '27017';
const MONGO_DB = 'tasafe';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
console.log('mongoCOnnection string', url);
mongoose.connect(url, {useNewUrlParser: true});

var ContactSchema = new Schema({
  identifier: {
    type: String,
    required: true,
    trim: true
  },
  name : {
    type: String,
     required: true,
     trim: true
   },
  no : {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
});

const Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;


