import {Schema} from 'mongoose';

export let PlanningVacationSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  val: Date,
  resourceTrigram: String
})
