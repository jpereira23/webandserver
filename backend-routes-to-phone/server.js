const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const multer = require('multer');
const app = express();
const fs = require('fs');
const pdfreader = require('pdfreader');

var rows = {}; 

function printRows() {
    Object.keys(rows) // => array of y-positions (type: float) 
          .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions 
              .forEach((y) => console.log((rows[y] || []).join('')));
}
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  //res.header("Access-Control-Allow-Origin", "http://192.168.1.64:4200");
  //res.header("Access-Control-Allow-Origin", "http://172.124.232.210");
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const storage = multer.diskStorage({
  destination: function(req, res, cb){
    cb(null, './pdfs');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});


var upload = multer({
  storage: storage
}).single('file');

app.use(bodyParser.json({limit: '50mb'}));

app.post('/getupload', function(req, res) {
  upload(req, res, function(err){
      console.log(req.file);
      if(err)
      {
        console.log("not working");
        res.json({error_code: 1, err_desc: err});
        return;
      }
      console.log("Successfully saved file.");
      res.json({error_code: 0, err_desc: null});
  });
});

app.get('/download', function(req, res){
  var file = __dirname + '/manifest.apk';
  res.download(file);
});


app.options('/getupload', function(req, res, next) {
  console.log("hello");
  if(req.method == 'OPTIONS')
  {
    var headers = {};
    //headers["Access-Control-Allow-Origin"] =  "http://172.124.232.210";
    //headers["Access-Control-Allow-Origin"] =  "http://192.168.1.64:4200";
    headers["Access-Control-Allow-Origin"] =  "http://localhost:4200";
    headers["Access-Control-Allow-Credentials"] = true;
    headers["Access-Control-Max-Age"] = '86400';
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    res.writeHead(200, headers);
    res.end();
  }
});

app.options('/download', function(req, res, next) {
  console.log("hello");
  if(req.method == 'OPTIONS')
  {
    var headers = {};
    headers["Access-Control-Allow-Origin"] =  "http://172.124.232.210";
    //headers["Access-Control-Allow-Origin"] =  "http://192.168.1.64:4200";
    headers["Access-Control-Allow-Credentials"] = true;
    headers["Access-Control-Max-Age"] = '86400';
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    res.writeHead(200, headers);
    res.end();
  }
});



const api = require('./server/routes/api');
const dataB = require('./server/routes/dataB');

app.use('/api', api);
app.use('/dataB', dataB);

app.get('/dataB', function(req, res){
  res.end('dataB catcher example');
});
app.get('/api', function(req, res) {
  res.end('file catcher example');
});


// API file for interacting with MongoDB

// Angular DIST output folder
//app.use(express.static(path.join(__dirname, 'dist')));

// API location


// Send all other requests to the Angular app
//app.get('*', (req, res) => {
  //  res.sendFile(path.join(__dirname, 'dist/index.html'));
//});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));







