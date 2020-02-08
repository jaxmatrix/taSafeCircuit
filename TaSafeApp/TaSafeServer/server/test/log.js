const fs = require('fs')

const enterLog = function (msg) {
  logTime = Date.now();
  logString = logTime + ':  ' + msg + "\n";


  fs.appendFile('./logs/log', logString, function(err){
    if (err) throw err;
  });
};

enterLog("All is well");
module.exports = enterLog
