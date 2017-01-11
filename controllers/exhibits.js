// Require model
var Exhibit = require('../models/exhibits');
var config = require('../config');

// s3 module
var s3 = require('s3');
var s3Client = s3.createClient({
  s3Options : {
    accessKeyId : config.aws_key,
    secretAccessKey : config.aws_sec
  }
});

// Export our route handlers
module.exports = {
  
  get : (req, res) => {
    Exhibit.find({}, (err, exhibs)=>{
      if(err) {
        console.log("Something bad happened! EXHIB-GET".red);
        return res.send(err)
      }
      
      res.send(exhibs);
      
    })
  },
  getOne :(req, res)=>{
    Exhibit.findOne({_id : req.params.id}, (err, exhib)=>{
      res.send(exhib);
    })
  },
  update : (req, res) =>{
    
//     Exhibit.findOneAndUpdate({_id : req.params.id}, req.body, {new : true}, (err, updated)=>{
//       res.send(updated);
//     })
    
    
    var body = req.body.data;
    var file = req.files.files;
    
    
    // 1. Upload file
    var filePath = '/exhibits/' + file.name
    var uploader = s3Client.uploadFile({
      localFile : file.path,
      s3Params : {
        Bucket : config.aws_buc,
        Key    : filePath,  // Where in the bucket the file is stored
        ACL    : 'public-read'
      }
    });
    
    uploader.on('progress', ()=>{
      console.log(`Progress : ${uploader.progressAmount} / ${uploader.progressTotal}  -- ${((uploader.progressAmount / uploader.progressTotal) * 100).toFixed(2)}%`);
    });
    
    uploader.on('end', ()=>{
      // This is where you can retrieve the URL of the image
      
      var URL = s3.getPublicUrlHttp(config.aws_buc, filePath);
      
      // add URL to the exhibit object
      body.photo = URL
      
     Exhibit.findOneAndUpdate({_id : req.params.id}, body, {new : true}, (err, updated)=>{
        res.send(updated);
      });
      
      
    })
    
    
    
    // 2. Update the exhibit with the file url
    
    
    
    
    
  }
  
}

