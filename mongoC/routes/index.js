var express = require('express');
var router = express.Router();


/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB',{ useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var userSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Password: String
});

var User = mongoose.model('User', userSchema); //Makes an object from that schema as a model

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});




router.post('/register', function(req, res, next) {
  console.log("POST register route"); 
  if(!req.body.Name || !req.body.Password){
    res.json("empty")
    return;
  }
  
  User.find({ Name: req.body.Name }, function(err,results){
    if (err) return console.error(err);//cthrow err;
      if(results && results.length > 0)
        res.json("username taken");
      else{
        res.json("registering user");
        var newUser = new User(req.body);  
        newUser.save(function(err, post) { 
          if (err) return console.error(err);
        });      
      }
  });//end find
});



router.post('/login', function(req, res, next) {
  console.log("POST login route"); 
  if(!req.body.Name || !req.body.Password){
    res.json("empty")
    return;
  }
  
  User.find({ Name: req.body.Name }, function(err,results){
    if (err) return console.error(err);
      if(results && results.length > 0)
        res.json("logged in");
      else{
        res.json("username doesn't exist");
      }
  });//end find
});





router.get('/users', function(req, res, next) {
  console.log("GET user route");

  User.find(function(err,userList) { 
    if (err) return console.error(err);
    else {
    res.json(userList);
  }
})
});

router.post('/delete', function(req, res, next) {
console.log("POST delete route");
  User.remove().exec();
  Comment.remove().exec();
});


router.post('/comment', function(req, res, next) {
console.log("POST comment route"); 
      
    var newcomment = new Comment(req.body); 
    newcomment.save(function(err, post) { 
        if (err) return console.error(err);
        Comment.find(function(err,userList) { 
          if (err) return console.error(err); 
          else {
            res.json(userList); 
          }
        })
    });
});

router.get('/commentFirst', function(req, res, next) {
  console.log("GET commentFirst route"); 
        
    Comment.find(function(err,userList) { 
      if (err) return console.error(err); 
      else res.json(userList); 
    })
});


module.exports = router;
