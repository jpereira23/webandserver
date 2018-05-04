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
var storedRoutes = [];
var auditType = "";

var RouteDate = function(){
  this.day = 0;
  this.month = 0;
  this.year = 0;
  this.hour = 0;
  this.minute = 0; 
};

var Route = function(){
  this.routeNumber = "";
  this.date = new RouteDate();
  this.cartPositions = [];
  this.stops = [];
  this.hotStops = [];
};

var CartPosition = function(){
  this.cartPosition = "";
  this.items = []; 
  this.type = "";
};

var Item = function(){
  this.itemName = "";
  this.wrin = "";
  this.quantity = "";
  this.stopNumber = "";
  this.type = "";
  this.cartPosition = "";
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
    console.log(route);
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

  router.post('/sendEndOfShift', (req, res) => {
    var auditor = req.body;
    for(var i = 0; i < auditor.routes.length; i++){
      var tmpRoute = parseInt(auditor.routes[i].routeNumber);
      tmpRoute = tmpRoute - 100;
      var counter = 0;
      while(tmpRoute >= 0)
      {
	tmpRoute = tmpRoute - 100;
	counter++;
      }

      var year = 2000 + auditor.routes[i].date.year;
      var d = new Date(year, auditor.routes[i].date.month-1, auditor.routes[i].date.day, 0, 0, 0);
      switch(counter){
	case 1:
	  if(d.getDay() == 6){
	    console.log(auditor.routes[i].routeNumber + " is going in 100 series for Saturday or " + d.getUTCMonth() + "/" + d.getUTCDay() + "/" + d.getUTCFullYear());
	  }
	  //else if(d.getDay() == 0){

	  //}
	  break;
	case 2:
	  if(d.getDay() == 0){
	    console.log(auditor.routes[i].routeNumber + " is going in 200 series for Sunday or " + d.getUTCMonth() + "/" + d.getUTCDay() + "/" + d.getUTCFullYear());
	  }
	  //else if(d.getDay() == 1){

	  //}
	  break;
	case 3:
	  if(d.getDay() == 1){
	    console.log(auditor.routes[i].routeNumber + " is going in 300 series for Monday or " + d.getUTCMonth() + "/" + d.getUTCDay() + "/" + d.getUTCFullYear());
	  }
	  //else if(d.getDay() == 2){

	  //}
	  break;
	case 4: 
	  if(d.getDay() == 2){
	    console.log(auditor.routes[i].routeNumber + " is going in 400 series for Tuesday or " + d.getUTCMonth() + "/" + d.getUTCDay() + "/" + d.getUTCFullYear());
	  }
	  //else if(d.getDay() == 3){

	  //}
	  break;
	case 5:
	  if(d.getDay() == 3){
	    console.log(auditor.routes[i].routeNumber + " is going in 500 series for Wednesday or " + d.getUTCMonth() + "/" + d.getUTCDay() + "/" + d.getUTCFullYear());
	  }
	  //else if(d.getDay() == 4){

	  //}

	  break;
	case 6: 
	  if(d.getDay() == 4){
	    console.log(auditor.routes[i].routeNumber + " is going in 600 series for Thursday or " + d.getDay);
	  }
	  //else if(d.getDay() == 5){

	  //}
	  break;
	case 7: 
	  if(d.getDay() == 5){
	    console.log(auditor.routes[i].routeNumber + " is going in 700 series for Friday or " + d.getDay);
	  }
	  //else if(d.getDay() == 6){

	 // }
	  break;
      }
    }
  });

  router.post('/addPicker', (req, res) => {
    var picker = req.body;
    console.log(picker);
    db.collection('pickers')
      .save(picker, function(err, picker){
	if(err){
	  res.send(err);
	}else{
	  res.json(picker);
	}
      });
  });

  router.get('/getPickers', (req, res) => {
    db.collection('pickers').find().toArray().then((picker) => {
      response.data = picker;
      res.json(response);
    }).catch((err) => {
      sendError(err, res); 
    });
  });

  router.post('/removeAll', (req, res) => { 
    db.collection('route').remove({});
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
    console.log("Compile Manifest being called");
    new pdfreader.PdfReader().parseFileItems(file.name, function(err, item){
      if(!item){
        console.log("finished processing file");
        console.log(routesArray.length);
        var bulk = [];
        for(var i = 0; i < routesArray.length; i++)
        {
          if(routeExists(routesArray[i], storedRoutes) == false)
          {
            storedRoutes.push(routesArray[i]);
            bulk.push({insertOne: routesArray[i]});
          }
        }
        if(bulk.length != 0)
        {
          addRoute(bulk);
        }
        bulk = [];
        routesArray = [];
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

function addRoute(theBulk)
{
  db.collection('route').bulkWrite(theBulk, {ordered: false});

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
      console.log("HELLO");
      var date = new RouteDate();
      date.month = parseInt(text.slice(0, 2));
      date.day = parseInt(text.slice(3, 5));
      date.year = parseInt(text.slice(6,8));
      date.hour = parseInt(text.slice(9,11));
      date.minute = parseInt(text.slice(12, 14));
      route.date = date;
      console.log("HELLLLLLLO");
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
      item.cartPosition = text;
      if(checkCartPosition(text, route) == true)
      {
        cartPosition = new CartPosition();
        cartPosition.cartPosition = text;
	cartPosition.type = auditType;
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
      if(route.cartPositions.length > 1 && isCurrentCartSameAuditType(item, auditType, route) == false){
	var aCartPosition = new CartPosition();
	aCartPosition.cartPosition = item.cartPosition;
	aCartPosition.type = auditType;
	route.cartPositions.push(aCartPosition);
      }
      route.cartPositions[route.cartPositions.length - 1].items.push(item);
      if(checkStopRoutes(item.stopNumber, route) == true)
      {
        route.stops.push(item.stopNumber);
      }
      break; 
    default: 
      break;
  }
}


function isCurrentCartSameAuditType(item, auditType, route){
  if(route.cartPositions.length > 1)
  {
    for(var i = 0; i < route.cartPositions.length; i++){
      if(route.cartPositions[i].cartPosition == item.cartPosition){
	if(route.cartPositions[i].type == auditType){
	  return true;
	}
      }
    }
  }
  return false;
}

function getIndexOfCartPosition(route, item){
  for(var i = 0; i < route.cartPositions.length; i++)
  {
    if(item.cartPosition == route.cartPositions[i].cartPosition)
    {
      return i;
    }
  }
  return (route.cartPositions.length - 1)
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

function routeExists(route, aStoredRoutes){
  for(var i = 0; i < aStoredRoutes.length; i++)
  {
    if(aStoredRoutes[i].routeNumber == route.routeNumber)
    {
      return true;
    }
  }
  return false;
}

});
module.exports = router;
