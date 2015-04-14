'use strict';

var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.loadFromPath('server/config/aws_s3_config.json');

var s3Bucket = new AWS.S3( { params: {Bucket: 'firealbum'} } );

router.get('/', function(req, res) {
	res.send('Photo Home page');
});

router.post('/', function(req, res) {
	// Create buffer of base64 data.
	var buf = new Buffer(req.body.data.replace(/^data:image\/\w+;base64,/, ""),'base64');

  var data = {
    Key: req.body.timestamp.toString(),
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };

  // Insert object into S3 Buckets.
  s3Bucket.putObject(data, function(err, data) {
    if (err) {
      console.log(err);
      console.log('Error uploading data: ', data);
      res.json({err: err, data: data});
    } else {
      console.log('succesfully uploaded the image!', data);
      res.json({data: data});
    }
  });
});

module.exports = router;