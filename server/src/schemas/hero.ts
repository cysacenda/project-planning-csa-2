import { Schema } from 'mongoose';

export let heroSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: String
})
