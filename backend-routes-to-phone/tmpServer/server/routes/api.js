const config = require('../../config.json');
const socket = require('socket.io');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoUtil = require('./mongoUtil.js');
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const Q = require('q');
const fs = require('fs');
const pdfreader = require('pdfreader');
const http = require('http');

//const server = http.Server(router); 
//const io = socket(server);
var aConnection = null; 


// Connect
var routesArray = [];
var cartPositionsArray = [];
var auditType = "";
var Route = function(){
  this.routeNumber = "";
  this.date = "";
  this.cartPositions = [];
  this.stops = [];
  this.hotStops = [];
};

var CartPosition = function(){
  this.cartPosition = "";
  this.items = []; 
};

var Item = function(){
  this.itemName = "";
  this.wrin = "";
  this.quantity = "";
  this.stopNumber = "";
  this.type = "";
};


const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

let response = {
  status: 200,
  data: [],
  message: null
};

MongoClient.connect('mongodb://localhost:27017/manifests', {
    poolSize: 12 
  },
  (err, client) => {
  if(err) return console.log(err);
  var db = client.db('manifests');
  router.get('/obtainManifest', (req, res) => {
    db.collection('route')
    .find()
    .toArray()
    .then((routes) => {
      response.data = routes;
      res.json(response);
    })
    .catch((err) => {
      sendError(err, res);
    });
  });

  router.post('/updateForHotRoute', (req, res) => {
    var route = req.body;
      db.collection('route')
        .update({'routeNumber': route.routeNumber}, {'routeNumber': req.body.routeNumber, 'date': req.body.date, 'cartPositions': req.body.cartPositions, 'stops': req.body.stops, 'hotStops': req.body.hotStops}, { $multi: true }, function(err, route){
           if(err)
           {
            console.log(err);
            res.send(err);
           }
           else
           {
            console.log("Successful");
            res.json(route);
           } 
        });
  });

router.post('/compileManifest', (req, res) => {
  var file = req.body;
  var globalCounter = 0;
  var itemCounter = 0; 
  var cartTotalCounter = 0;
  var endOfPageCounter = 0;
  var route;
  var anItem;
  var cartPosition = new CartPosition();
  new pdfreader.PdfReader().parseFileItems(file.name, function(err, item){

    if(!item){
      console.log("finished processing file");
      console.log(routesArray.length);
      for(var i = 0; i < routesArray.length; i++)
      {
        addRoute(routesArray[i]);
      }
      routesArray = [];
      /*
      for(var i = 0; i < routesArray[0].cartPositions.length; i++)
      {
        console.log(routesArray[0].cartPositions[i]);
      }
      */
      //console.log(routesArray);
    }
    else if(item.text){
      if(globalCounter >= 0 && globalCounter <= 17)
      {
        if(globalCounter == 0)
        {
          route = new Route();
        }
        pageHeader(globalCounter, route, item.text);
        if(globalCounter == 17)
        {
          if(isRoute(route.routeNumber, routesArray) == true)
          {
            routesArray.push(route);
          }
        }
      }
      else if(item.text == "CART TOTAL")
      {
        cartTotalCounter++;
      }
      else if(cartTotalCounter == 1)
      {
        cartTotalCounter = 0; 
      }
      else if(item.text.indexOf('/18 ') > -1)
      {
        endOfPageCounter++;
      }
      else if(endOfPageCounter > 0 && endOfPageCounter < 3)
      {
        endOfPageCounter++;
      }
      else if(endOfPageCounter == 3)
      {
        endOfPageCounter = 0;
        globalCounter = -1;
      }
      else if(itemCounter <= 8)
      {
        if(itemCounter == 8)
        {
          itemCounter = 0;
        }
        else if(itemCounter == 0)
        {
          anItem = new Item();
          consumeItems(itemCounter, anItem, cartPosition, item.text, routesArray[routesArray.length -1]);
          itemCounter++;
        }
        else{
          consumeItems(itemCounter, anItem, cartPosition, item.text, routesArray[routesArray.length -1]);
          itemCounter++;
        }
      }
      globalCounter++;
    }

  });
  
});

function isRoute(routesNumber, routes)
{ 
  for(var i = 0; i < routes.length; i++)
  {
    if(routes[i].routeNumber == routesNumber)
    {
      return false;
    }
  }
  return true;
}

function addRoute(route)
{
    db.collection('route')
      .save(route, function(err, route){
        if(err){
          console.log(err);
        }else{
          console.log("successful");
        }
      });
}

function pageHeader(counter, route, text)
{
  switch(counter)
  {
    case 3: 
      route.routeNumber = text;
      break;
    case 5: 
      auditType = text;
      break;
    case 7:
      route.date = text;
      break;
    default: 
      break;
  }
}

function consumeItems(counter, item, cartPosition, text, route)
{
  switch(counter)
  {
    case 0:
      item.stopNumber = text;
      break;
    case 1: 
      item.itemName = text;
      break;
    case 3: 
      item.quantity = text;
      break;
    case 4:
      if(checkCartPosition(text, route) == true)
      {
        cartPosition = new CartPosition();
        cartPosition.cartPosition = text;
        //cartPosition.route = route;
        route.cartPositions.push(cartPosition);
      }
      else
      {
        cartPosition = getCartPosition(text, route);
      }
      break;
    case 5:
      item.wrin = text;
      break;
    case 6: 
      item.type = auditType;
      route.cartPositions[route.cartPositions.length -1].items.push(item);
      
      if(checkStopRoutes(item.stopNumber, route) == true)
      {
        route.stops.push(item.stopNumber);
      }
      break; 
    default: 
      break;
  }
}

function checkStopRoutes(stopNumber, route)
{
  for(var i = 0; i < route.stops.length; i++)
  {
    if(route.stops[i] == stopNumber)
    {
      return false;
    }
  }
  return true;
}
function checkCartPosition(text, route)
{
  for(var i = 0; i < route.cartPositions.length; i++)
  {
    if(route.cartPositions[i].cartPosition == text)
    {
      return false;
    }
  }
  return true;
}

function getCartPosition(text, route)
{
  for(var i = 0; i < route.cartPositions.length; i++)
  {
    if(route.cartPositions[i].cartPosition == text)
    {
      return route.cartPositions[i];
    }
  }
  return null;
}

});
module.exports = router;
