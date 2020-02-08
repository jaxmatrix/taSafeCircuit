const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = require('./db.js');

console.log('mongo Connection string', url);
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

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


