import {Schema} from 'mongoose';

export let PlanningTaskSchema: Schema = new Schema({
  createdAt: {type: Date, default: Date.now},
  _id: Number,
  name: String,
  workload: Number,
  etc: Number,
  position: Number,
  resource_id: String,
  project_id: String,
})
