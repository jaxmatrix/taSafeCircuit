const url = require('../models/db.js');
const mongoose = require('mongoose');
const log = require('./log');


console.log("Connection URL", url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

log('Testing Connnection to DB');


mongoose.connection.on('connected', function(msg){
  console.log("Connection Successful to the server", msg);
  log("Server Connected : " + msg);
});

mongoose.connection.on('error', function(err){
  console.log('Unable to connecte to the server', err);
  log("Unable to connect to server :: " + err);
});

mongoose.connection.on('disconnected', function(msg){
  console.log("Server Disconnected :" +  msg);
  log("Server Disconnection : " + msg);
});



