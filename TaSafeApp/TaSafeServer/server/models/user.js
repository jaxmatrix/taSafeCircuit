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

const User = mongoose.model('User', UserSchema);

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

UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
    .exec(function(err, user) {
      if(err) {
        return callback(err)
      } else if(!user) {
        var err = new Error('User not found');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function(err,result){
        if(result==true){
          return callback(null, user)
          } else {
            return callback();
          }
        }
      );
    });
}

module.exports = User;


