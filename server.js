// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// mongoose specific
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myappdatabase');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

var PlanningParams = require('./server/modelTmp/planning-params.model');
//var PlanningParams = require('./dist/out-tsc/planning-params.model');

// ROUTES FOR OUR API
// =============================================================================

// Get our API routes
//const api = require('./server/routes/api');

// Set our api routes
//app.use('/api', api);

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// on routes that end in /planning-params
// ----------------------------------------------------
router.route('/planning-params')

// Create a planningParams (accessed at POST http://localhost:3000/api/planning-params)
  .post(function (req, res) {

    var planp = new PlanningParams();      // create a new instance of the PlanningParams model
    planp.currentDate = req.body.currentDate;  // set the PlanningParams name (comes from the request)

    // save the planning params and check for errors
    planp.save(function (err) {
      if (err)
        res.send(err);

      res.json({message: 'PlanningParams created!'});
    });

  })

  // Get all the PlanningParams (accessed at GET http://localhost:3000/api/planning-params)
  .get(function (req, res) {
    PlanningParams.find(function (err, planningParams) {
      if (err)
        res.send(err);

      res.json(planningParams);
    });
  });

// on routes that end in /planning-params/:planning-params_id
// ----------------------------------------------------
router.route('/planning-params/:planningParams_id')

// get the planning-params with that id (accessed at GET http://localhost:3000/api/planning-params/:planning-params_id)
  .get(function (req, res) {
    PlanningParams.findById(req.params.planningParams_id, function (err, PlanningParams) {
      if (err)
        res.send(err);
      res.json(PlanningParams);
    });
  })

  // update the planning-params with this id (accessed at PUT http://localhost:3000/api/planning-params/:planning-params_id)
  .put(function (req, res) {

    // use our planning-params model to find the planning-params we want
    PlanningParams.findById(req.params.planningParams_id, function (err, PlanningParams) {

      if (err)
        res.send(err);

      PlanningParams.currentDate = req.body.currentDate;  // update the planning-params info

      // save the planning-params
      PlanningParams.save(function (err) {
        if (err)
          res.send(err);

        res.json({message: 'PlanningParams updated!'});
      });

    });
  })

  // delete the planning-params with this id (accessed at DELETE http://localhost:3000/api/planning-params/:planningParams_id)
  .delete(function (req, res) {
    PlanningParams.remove({
      _id: req.params.planningParams_id
    }, function (err, planningParams) {
      if (err)
        res.send(err);

      res.json({message: 'Successfully deleted'});
    });
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API is running on port ' + port);
