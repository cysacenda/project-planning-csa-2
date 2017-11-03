import {Schema} from 'mongoose';

export let PlanningTaskSchema: Schema = new Schema({
  createdAt: {type: Date, default: Date.now},
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
})
