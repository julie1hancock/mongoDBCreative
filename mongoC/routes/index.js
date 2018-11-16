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
    Password: String
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

  User.find(function(err,userList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
    else {
    console.log(userList); //Otherwise console log the comments you found
    res.json(userList); //Then send the comments
  }
})
});

router.post('/delete', function(req, res, next) {
console.log("POST delete route");
  User.remove().exec();
});

router.post('/comment', function(req, res, next) {
console.log("POST comment route"); 
console.log(req.body); 

    var newcomment = new Comment(req.body); 
    console.log(newcomment); 
    newcomment.save(function(err, post) { 
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
    
});














router.get('/comment', function(req, res, next) {
console.log("In the GET route?");
Comment.find(function(err,commentList) { //Calls the find() method on your database
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(commentList); //Otherwise console log the comments you found
    res.json(commentList); //Then send the comments
  }
})

});





module.exports = router;
