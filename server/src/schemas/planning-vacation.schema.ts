import {Schema} from 'mongoose';

export let PlanningVacationSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  vacationDate: Date,
  value: Number
})
