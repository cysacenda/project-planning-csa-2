import { Schema } from 'mongoose';

export let PlanningParamsSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  currentDate: Date
})
