import {Schema} from 'mongoose';

export let PlanningResourceSchema: Schema = new Schema({
  trigram: String,
  name: String,
  role: String,
  description: String
})
