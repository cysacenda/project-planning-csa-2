// Import the mongoose module
var mongoose = require('mongoose');

// Set up default mongoose connection
var mongoDB = require('config').get('dbConfig.dbAdress');
mongoose.Promise = require('bluebird');
mongoose.connect(mongoDB, {useMongoClient: true});

// Get the default connection
var db = mongoose.connection;


// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  PopulateDb();
});

// Si on a utilisé mongoose.connect()
//mongoose.connection.close();

function PopulateDb(){
  // Define a schema
  var Schema = mongoose.Schema;



/// PlanningParams ///
/// -------------- ///

  var planningParams = new Schema({
    currentDate: String
  });

// Compile model from schema
  var planningParamsModel = mongoose.model('planningparams', planningParams);
  var monPlanningParamsModel = new planningParamsModel({currentDate: '2017-06-11T22:00:00.000Z'});

// Empty Database
  planningParamsModel.remove({}, function (err) {
    console.log('planning-params supprimé')
  });

//Create object
  monPlanningParamsModel.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('planning-params créé !');
  });

/// PlanningResource ///
/// -------------- ///

  var planningResource = new Schema({
    trigram: String,
    name: String,
    role: String,
    description: String,
    vacationMap: [{
      key: String,
      val: Number
    }]
  });

// Compile model from schema
  var planningResourceModel = mongoose.model('planningresources', planningResource);
  var monPlanningResourceModel1 = new planningResourceModel({
    trigram: 'CSA',
    name: 'Cyril SACENDA',
    role: 'CP',
    description: 'lol le CP',
    vacationMap: [{key: '2017-06-11T22:00:00.000Z', val: 1}, {
      key: '2017-06-12T22:00:00.000Z',
      val: 1
    }, {key: '2017-06-13T22:00:00.000Z', val: 0.25}]

  });
  var monPlanningResourceModel2 = new planningResourceModel({
    trigram: 'MBO',
    name: 'Mohamed BOUHAMYD',
    role: 'Dev',
    description: 'lol le Dev',
    vacationMap: [{key: '2017-06-11T22:00:00.000Z', val: 1}, {
      key: '2017-06-12T11:00:00.000Z',
      val: 1
    }, {key: '2017-06-13T22:00:00.000Z', val: 0.25}]
  });

// Empty Database
  planningResourceModel.remove({}, function (err) {
    console.log('planning-resources supprimé')
  });

//Create object
  monPlanningResourceModel1.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('planning-resource créé !');
  });
//Create object
  monPlanningResourceModel2.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('planning-resource créé !');
  });

/// PlanningTasks ///
/// -------------- ///
  var planningTask = new Schema({
    name: String,
    workload: Number,
    etc: Number,
    position: Number,
    resourceTrigram: String,
    projectName: String,
    daysMap: [{
      key: String,
      val: Number
    }],
    isMilestone: Boolean,
    milestoneDate: String
  });

// Compile model from schema
  var planningTaskModel = mongoose.model('planningtasks', planningTask);
  var monPlanningTaskModel1 = new planningTaskModel({
    name: 'Install API GW',
    workload: 5.5,
    etc: 2.25,
    position: 1,
    resourceTrigram: 'CSA',
    projectName: 'NOBC Mobile',
    daysMap: [{key: '2017-06-11T22:00:00.000Z', val: 1}, {
      key: '2017-06-12T22:00:00.000Z',
      val: 1
    }, {key: '2017-06-13T22:00:00.000Z', val: 0.25}],
    isMilestone: false
  });

  var monPlanningTaskModel2 = new planningTaskModel({
    name: 'Config API GW',
    workload: 1.5,
    etc: 0.5,
    position: 2,
    resourceTrigram: 'CSA',
    projectName: 'NOBC Mobile',
    daysMap: [{key: '2017-06-13T22:00:00.000Z', val: 0.5}],
    isMilestone: false
  });

  var monPlanningTaskModel3 = new planningTaskModel({
    name: 'Deploy API GW',
    position: 3,
    resourceTrigram: 'MBO',
    projectName: 'NOBC Mobile',
    isMilestone: true,
    milestoneDate: '2017-06-11T22:00:00.000Z'
  });

  var monPlanningTaskModel4 = new planningTaskModel({
    name: 'Test API GW',
    workload: 5,
    etc: 3,
    position: 4,
    resourceTrigram: 'MBO',
    projectName: 'NOBC Mobile',
    daysMap: [{key: '2017-06-11T22:00:00.000Z', val: 0.5}, {
      key: '2017-06-12T22:00:00.000Z',
      val: 1
    }, {key: '2017-06-13T22:00:00.000Z', val: 1}, {key: '2017-06-14T22:00:00.000Z', val: 0.5}],
    isMilestone: false
  });

// Empty Database
  planningTaskModel.remove({}, function (err) {
    console.log('planning-tasks supprimé')
  });

//Create object
  monPlanningTaskModel1.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('planning-task créé !');
  });
//Create object
  monPlanningTaskModel2.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('planning-task créé !');
  });
//Create object
  monPlanningTaskModel3.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('planning-task créé !');
  });
//Create object
  monPlanningTaskModel4.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('planning-task créé !');
  });

/// PlanningVacations ///
/// -------------- ///


  var planningVacations = new Schema({
    vacationDate: Date,
    resourceTrigram: String,
    value: Number
  });

// Compile model from schema
  var planningVacationsModel = mongoose.model('planningvacations', planningVacations);
  var monplanningVacationsModel1 = new planningVacationsModel(
    {
      vacationDate: '2017-06-11T22:00:00.000Z',
      resourceTrigram: 'MBO',
      value: 1
    });
  var monplanningVacationsModel2 = new planningVacationsModel(
    {
      vacationDate: '2017-08-14T22:00:00.000Z',
      resourceTrigram: 'ALL',
      value: 1
    });
  var monplanningVacationsModel3 = new planningVacationsModel(
    {
      vacationDate: '2017-06-12T22:00:00.000Z',
      resourceTrigram: 'CSA',
      value: 0.5
    });

// Empty Database
  planningVacationsModel.remove({}, function (err) {
    console.log('planning-vacations supprimé')
  });

//Create object
  monplanningVacationsModel1.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('planning-vacations créé !');
  });
  monplanningVacationsModel2.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('planning-vacations créé !');
  });
  monplanningVacationsModel3.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('planning-vacations créé !');
  });

///       End      ///
/// -------------- ///

}

