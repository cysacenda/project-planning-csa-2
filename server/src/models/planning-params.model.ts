import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';
import { PlanningParamsInterface } from '../interfaces/planning-params.interface';
import { PlanningParamsSchema } from '../schemas/planning-params.schema';

export interface PlanningParamsModelInterface extends PlanningParamsInterface, Document {}

export interface PlanningParamsModelInterfaceStatic extends Model<PlanningParamsModelInterface> {}

export const PlanningParamsModel = mongoose.model<PlanningParamsModelInterface, PlanningParamsModelInterfaceStatic>('PlanningParams', PlanningParamsSchema);
