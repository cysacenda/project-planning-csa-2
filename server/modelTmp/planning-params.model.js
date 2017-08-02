// app/models/planning-params.model.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlanningParamsSchema   = new Schema({
  currentDate: Date,
});

module.exports = mongoose.model('PlanningParams', PlanningParamsSchema);
