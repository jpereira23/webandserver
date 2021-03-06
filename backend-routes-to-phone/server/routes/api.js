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
const schedule = require('node-schedule');

      

//const server = http.Server(router); 
//const io = socket(server);
var aConnection = null; 


// Connect
var routesArray = [];
var cartPositionsArray = [];
var storedRoutes = [];
var auditType = "";
var diaHoy = new Date();

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
  this.alocation = "";
  this.storeNumber = "";
};

var aDate = function(){
  this.date = "";
  this.theDate = new Date();
  this.errors = [];
  this.routes = [];
};

var Auditor = function(){
  this.firstName = "";
  this.lastName = "";
  this.dates = [];
}

var aRoute = function(){
  this.routeNumber = "";
  this.statuss = [];
};

var aStatus = function(){
  this.auditorFirstName = "";
  this.auditorLastName = "";
  this.statusName = "";
  this.stops = [];
};

var aStop = function(){
  this.cartPositions = [];
  this.stopNumber = "";
};  

var aCartPosition = function(){
  this.pickerName = "";
  this.items = [];
  this.cartPositionName = "";
  this.audited = false;
  this.auditedItems = 0;
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

  
  var j = schedule.scheduleJob('9 * * *', function(fireDate){
    db.collection('route').remove({});
    routesArray = [];
    diaHoy = new Date();
    
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
    var theDate = new aDate();	
    diaHoy.setDate(2);
    theDate.theDate = diaHoy;
    theDate.errors = auditor.errors;
    var anAuditor = new Auditor();
    anAuditor.firstName = auditor.firstName;
    anAuditor.lastName = auditor.lastName;
    for(var i = 0; i < auditor.auditedRoutes.length; i++)
    {
      addRouteToDate(theDate, auditor.auditedRoutes[i], auditor.firstName, auditor.lastName);
    }


    db.collection('auditors').findOne({firstName: auditor.firstName, lastName: auditor.lastName}, function(err, doc) {
      if(doc){
	doc.dates.push(theDate);
	console.log(doc.dates);
	db.collection('auditors').update({'_id': ObjectID(doc._id)}, {'firstName': doc.firstName, 'lastName': doc.lastName, 'dates': doc.dates}, { $multi: true }, function(err, auditor){
	  if(err){
	    res.send(err);
	  }else{
	    res.json(auditor);
	    console.log("HELLO WORLD");
	  }
	});
      }
      else{
	console.log("NEVERMIND");
	anAuditor.dates.push(theDate);
	db.collection('auditors').save(anAuditor, function(err, auditor){
	  if(err){
	    res.send(err);
	  }else{
	    res.json(auditor);
	  }
	});
      }
    });
  });

  router.get('/theAuditors', (req, res) => { 
    db.collection('auditors').find().toArray().then((theArchives) => {
      response.data = theArchives;
      res.json(response);
    }).catch((err) => {
      sendError(err, res);
    });
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
	    consumeItems(itemCounter, anItem, cartPosition, item.text, routesArray[routesArray.length -1]);
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

function checkIfAuditor(theDate, theAuditor){
  for(var i = 0; i < theDate.auditors.length; i++)
  {
    if(theDate.auditors[i].firstName == theAuditor.firstName){
      return true;
    }
  }
  return false;
}

function organizeDateForRouteStore(theDate, counter, year, date, route, firstName, lastName){
	   
}

function addRouteToDate(theDate, route, firstName, lastName){
  var theRoute = new aRoute();
  theRoute.routeNumber = route.routeNumber;
  for(var i = 0; i < route.statuss.length; i++){
    var theStatus = new aStatus();
    theStatus.status = route.statuss[i].status;
    for(var j = 0; j < route.statuss[i].stops.length; j++){
      theStatus.auditorFirstName = firstName;
      theStatus.auditorLastName = lastName;
      var theStop = new aStop();
      theStop.stopNumber = route.statuss[i].stops[j].stopNumber;
      for(var k = 0; k < route.statuss[i].stops[j].cartPositions.length; k++){
	var theCartPosition = new aCartPosition();
	theCartPosition.pickerName = route.statuss[i].stops[j].cartPositions[k].picker.name;
	theCartPosition.cartPositionName = route.statuss[i].stops[j].cartPositions[k].cartPosition;
	theCartPosition.audited = route.statuss[i].stops[j].cartPositions[k].audited;
	theCartPosition.auditedItems = route.statuss[i].stops[j].cartPositions[k].auditedItems;
	for(var l = 0; l < route.statuss[i].stops[j].cartPositions[k].items.length; l++){
	  var aItem = new Item();
	  aItem.itemName = route.statuss[i].stops[j].cartPositions[k].items[l].itemName;
	  aItem.wrin = route.statuss[i].stops[j].cartPositions[k].items[l].wrin;
	  aItem.quantity = route.statuss[i].stops[j].cartPositions[k].items[l].quantity;
	  aItem.stopNumber = route.statuss[i].stops[j].cartPositions[k].items[l].type;
	  aItem.type = route.statuss[i].stops[j].cartPositions[k].items[l].cartPosition;
	  theCartPosition.items.push(aItem);
	}
	theStop.cartPositions.push(theCartPosition);
      }
      theStatus.stops.push(theStop);
    }
    theRoute.statuss.push(theStatus);
  }
  theDate.routes.push(theRoute);
}

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
      var date = new RouteDate();
      date.month = parseInt(text.slice(0, 2));
      date.day = parseInt(text.slice(3, 5));
      date.year = parseInt(text.slice(6,8));
      date.hour = parseInt(text.slice(9,11));
      date.minute = parseInt(text.slice(12, 14));
      route.date = date;
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
      item.storeNumber = text; 
      break; 
    case 8: 
      item.alocation = text;
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
