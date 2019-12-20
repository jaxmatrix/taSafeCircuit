const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
//const sessions = require('express-sessions');
const User = require('./models/user');
const Contact = require('./models/contact');
const PORT = process.env.PORT || 8000;
const debug = true;
const app = express();

/*
app.use(sessions({
  secret: 'awesome code',
  resave: true,
  saveUninitialized: false
}));

*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

if(!debug){
  app.use(express.static(__dirname + '/dist/TaSafeServer/'));
}

app.listen(PORT, ()=>{
  console.log("TaSafe Server running on " + PORT);
});

/*
app.post('*',(req,res)=>{
  console.log(req);
  res.end();
});

*/
app.post('/control/login', (req,res) => {
  console.log(req.body);
  User.findOne({email: req.body.login})
    .exec(function(err, user) {
      if(err) {
        res.json({result: 'failed', msg: err});
      } else if (!user) {
        res.json({result: 'failed', msg: 'No such user'});
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result){
          console.log("Password Comparision result", result, req.body.password, user)
          if (result == true) {
            res.send({result:'success', user:{ sessionid: user._id, username: user.name}});
          } else {
            res.send({ result: 'failed', msg:'Incorrect Password'});
          }
        });

      }
    });
  //res.json(req.body);
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


app.post('/control/newNumber', (req,res) => {
  Contact.create(req.body, function(err, usr){
    console.log(req.body);
    if(err){
      res.json({ result: 'failed', msg : err } );
    } else {
      res.json({ result: 'success'});
    }
  });
});


app.post('/control/contacts', (req,res) => {
  Contact.find({ identifier: req.body.identifier }, (err,result) => {
    if (err) {
      res.json({ result:'failed' , msg : err})
    } else {
      res.json({ result:'sucess' , contacts: result});
    }
  })
});
