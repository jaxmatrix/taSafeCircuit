const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const url = require('./db')

mongoose.connect(url, {useNewUrlParser: true , useUnifiedTopology: true});

var UserSchema = new Schema({
  productid: {
    type: String,
    required: true,
    trim: true
  },
  email : {
    type: String,
     unique: true,
     required: true,
     trim: true
   },
  name : {
    type: String,
    trim: true,
    required: true
  },
  password : {
    type: String,
    required: true
  }
});


UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const User = mongoose.model('User', UserSchema);

module.exports = User;


