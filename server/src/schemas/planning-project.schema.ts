import {Schema} from 'mongoose';

export let PlanningProjectSchema: Schema = new Schema({
  createdAt: {type: Date, default: Date.now},
  name: String,
  description: String
})
