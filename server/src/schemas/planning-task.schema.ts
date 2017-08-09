import {Schema} from 'mongoose';

export let PlanningTaskSchema: Schema = new Schema({
  createdAt: {type: Date, default: Date.now},
  name: String,
  workload: Number,
  etc: Number,
  position: Number,
  resource_id: String,
  resourceTrigram: String,
  project_id: String,
  projectName: String
})
