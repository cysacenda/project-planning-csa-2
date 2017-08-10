import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';
import { PlanningProjectInterface } from '../interfaces/planning-project.interface';
import { PlanningProjectSchema } from '../schemas/planning-project.schema';

export interface PlanningProjectModelInterface extends PlanningProjectInterface, Document {}

export interface PlanningProjectModelInterfaceStatic extends Model<PlanningProjectModelInterface> {}

export const PlanningProjectModel = mongoose.model<PlanningProjectModelInterface, PlanningProjectModelInterfaceStatic>('planningprojects', PlanningProjectSchema);
