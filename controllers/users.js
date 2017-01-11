// Require model
var User = require('../models/users');
var bcrypt = require('bcryptjs');

// Export our route handlers
module.exports = {
  
  get : (req, res) => {
    User.find({}, (err, users)=>{
      if(err) {
        console.log("Something bad happened! USER-GET".red);
        return res.send(err)
      }
      
      res.send(users);
      
    })
  },
  
  create : (req, res) => {
    // Creating / registering a new user
    
    req.body.email = req.body.email.toLowerCase(); 
    var zookeeper = new User(req.body);
    
    zookeeper.save((err, doc)=>{
      if(err){
        return res.send(err);
      }
      req.session.userID = doc._id; // Sets our cookie for authentication
      res.send(doc)
    });
    
  },
  
  login : (req, res) => {
    // Remember that login has many "bad" paths and one "happy" path
    
    // First, FIND the user
    User.findOne({email : req.body.email.toLowerCase()}, (err, user)=>{
      
      if(err) {
        return res.send(err) // BAD PATH
      }
      
      if(!user){
        return res.send("No user by that name here") // BAD PATH
      }
      
      // If we get here, we're assuming that the user exists
      // So, check the password!
      
      bcrypt.compare(req.body.pass, user.pass, (err, matched)=>{
          if(err){
            return res.send(err) // BAD PATH
          }
        
          if(!matched){
            return res.send("Wrong password bruh") // BAD PATH
          }
        
          // GOOD PATH! - user exists, password matches, no errs
        
          req.session.userID = user._id // Set our auth session
          res.send(user);
        
       })
      
      
      
    })
    
    
    
  }
  
}

