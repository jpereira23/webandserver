const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const expressJwt = require('express-jwt');
const config = require('./config.json');
const multer = require('multer');
const app = express();
var filename = '';
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    //cb(null, './src/multimedia');
    cb(null, './dist/multimedia');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
}).single('file');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/filename', function(req, res) {
  console.log("HELLO");
  console.log(res.date);
});
app.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    console.log(req.file);
    if(err)
    {
      res.json({error_code: 1, err_desc: err});
      return;
    }
    res.json({error_code: 0, err_desc:null});
  });
});

app.options('/upload', function(req, res, next) {
  if(req.method == 'OPTIONS')
  {
    var headers = {};
    //headers["Access-Control-Allow-Origin"] = "http://172.124.232.210:443";
    headers["Access-Control-Allow-Origin"] = "http://172.124.232.210";
    //headers["Access-Control-Allow-Origin"] = "http://192.168.1.64:4200";
    headers["Access-Control-Allow-Credentials"] = true;
    headers["Access-Control-Max-Age"] = '86400';
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    res.writeHead(200, headers);
    res.end();
  }
});

app.get('/api', function(req, res) {
  res.end('file catcher example');
});
// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '443';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
