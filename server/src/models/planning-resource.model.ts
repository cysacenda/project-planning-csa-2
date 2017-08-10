import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';
import { PlanningResourceInterface } from '../interfaces/planning-resource.interface';
import { PlanningResourceSchema } from '../schemas/planning-resource.schema';

export interface PlanningResourceModelInterface extends PlanningResourceInterface, Document {}

export interface PlanningResourceModelInterfaceStatic extends Model<PlanningResourceModelInterface> {}

export const PlanningResourceModel = mongoose.model<PlanningResourceModelInterface, PlanningResourceModelInterfaceStatic>('planningresources', PlanningResourceSchema);
