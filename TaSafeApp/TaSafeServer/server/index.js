const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-sessions');
const User = require('./models/user');
const PORT = process.env.PORT || 8000;
const debug = true;
const app = express();
app.use(sessions({
  secret: 'awesome code',
  resave: true,
  saveUninitialized: false
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

if(!debug){
  app.use(express.static(__dirname + '/dist/TaSafeServer/'));
}

app.listen(PORT, ()=>{
  console.log("TaSafe Server running on " + PORT);
})

/*
app.post('*',(req,res)=>{
  console.log(req);
  res.end();
});

*/
app.post('/control/login', (req,res) => {
  console.log(req.body);
  login = req.body;
  res.json(req.body);
});

app.post('/control/registration', (req,res) => {
  console.log(req.body);
  userData = req.body;
  User.create(userData,function(err, usr){
    if(err){
      console.log("error registration", err);
      res.json({ result:'failed'})
    } else {
      console.log('Registration Success');
      return res.json({result: 'success'});
    }
  });
});

