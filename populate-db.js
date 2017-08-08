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

// Si on a utilisé mongoose.connect()
mongoose.connection.close();
