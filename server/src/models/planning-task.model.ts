import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';
import { PlanningTaskInterface } from '../interfaces/planning-task.interface';
import { PlanningTaskSchema } from '../schemas/planning-task.schema';

export interface PlanningTaskModelInterface extends PlanningTaskInterface, Document {}

export interface PlanningTaskModelInterfaceStatic extends Model<PlanningTaskModelInterface> {}

export const PlanningTaskModel = mongoose.model<PlanningTaskModelInterface, PlanningTaskModelInterfaceStatic>('planningtasks', PlanningTaskSchema);
