const config = require('../../config.json');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const router = express.Router();



let response = {
  status: 200,
  data: [],
  message: null,
  object: null
};
MongoClient.connect('mongodb://localhost:27017/manifests', (err, client) => {
  if(err) return console.log(err);
  var adminDb = client.db('manifests').admin();

  adminDb.command({connectionStatus: 1, showPriveleges: true}, (err, result) => {
    console.log(result);
  });

  
  router.get('/storageDetails', (req, res) => {
    adminDb.command({dbStats: 1, scale:1073741824 }, (err, result) => {
      response.object = result;
      res.json(response);
    
    });
  });
});


module.exports = router;
