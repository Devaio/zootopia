require('colors');

// =======

// since we will be making 2 servers, we need 2 ports
var HTTP = require('http')
var HTTPS = require('https')
var PORTS = {
  HTTP : process.env.PORT || 80,
  HTTPS : process.env.PORT_SSL || 443
}

// Include TLS certificates
var fs = require('fs')
var httpsConfig = {}

if( fs.existsSync('/etc/letsencrypt/live/coelacanthstudios.com/privkey.pem') ) {
  httpsConfig.key  = fs.readFileSync('/etc/letsencrypt/live/coelacanthstudios.com/privkey.pem'),
  httpsConfig.cert = fs.readFileSync('/etc/letsencrypt/live/coelacanthstudios.com/cert.pem')
}

//--------
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan')('dev'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
//     PORT = process.env.PORT || 1488,
    app = express(),
    sessions = require('client-sessions')({
      cookieName : "_zooAuth",
      secret : "keyboardcat3",
      requestKey : "session",
      cookie : {
        httpOnly : true
      }
    });

// Connect to DB
mongoose.connect("mongodb://localhost/zoo", (err)=>{
  if(err){
    return console.log("DB failed to connect".trap);
  }
  console.log("☃☃ DB Connected ☃☃".cyan);
});

// Middleware
app.use(
  express.static('public'),
  bodyParser.json(),
  bodyParser.urlencoded({extended : true}),
  morgan,
  sessions
);

// Routes
routes(app);

// Listen
// app.listen(PORT, (err)=>{
//   if(err){
//     return console.log(`Our Server DIED ☃`.red.bold);
//   }
//   console.log(`☃☃ Server running on ${PORT} ☃☃`.green.bold);
// });

// =========
// instead of app.listen, we need to create both an http / https server

HTTP.createServer( app ).listen( PORTS.HTTP, ()=>{
  console.log(`HTTP server on ${PORTS.HTTP}`)
} );


// we may not always have cert files on the machine we develop on, so this will keep your app running as an http server at the very least
try {
  HTTPS.createServer( httpsConfig, app ).listen( PORTS.HTTPS, ()=>{
    console.log(`HTTPS server on ${PORTS.HTTPS}`)
  } );  
}

catch (err) {
  console.log("Couldn't start our https server :(", err);
}

// ---------





