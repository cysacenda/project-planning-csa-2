// Import the mongoose module
var mongoose = require('mongoose');

// Set up default mongoose connection
// TODO : variable
var mongoDB = 'mongodb://localhost:27017/planning-csa';
mongoose.connect(mongoDB);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema
var Schema = mongoose.Schema;

var planningParams = new Schema({
  currentDate: Date
});

var planningTask = new Schema({
  name: String,
  workload: Number,
  etc: Number,
  position: Number,
  resource_id: String,
  resourceTrigram: String,
  project_id: String,
  projectName: String
});

/// PlanningParams ///
/// -------------- ///

// Compile model from schema
var planningParamsModel = mongoose.model('planningparams', planningParams);
var monPlanningParamsModel = new planningParamsModel({currentDate: '2017-06-12T00:00:00.000Z'});

// Empty Database
planningParamsModel.remove({}, function(err) {
  console.log('planning-params supprimé')
});

//Create object
monPlanningParamsModel.save(function (err) {
  if (err) { throw err; }
  console.log('planning-params créé !');
});

/// PlanningTasks ///
/// -------------- ///

// Compile model from schema
var planningTaskModel = mongoose.model('planningtasks', planningTask);
var monPlanningTaskModel = new planningTaskModel({name: 'Install API GW',
  workload: 5,
  etc: 2,
  position: 1,
  resource_id: 'XXr',
  resourceTrigram: 'CSA',
  project_id: 'idp',
  projectName: 'App Mobile'});

// Empty Database
planningTaskModel.remove({}, function(err) {
  console.log('planning-tasks supprimé')
});

//Create object
monPlanningTaskModel.save(function (err) {
  if (err) { throw err; }
  console.log('planning-task créé !');
});

// Si on a utilisé mongoose.connect()
mongoose.connection.close();
