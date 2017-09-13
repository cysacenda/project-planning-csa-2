import mongoose = require('mongoose');
import {Document, Model} from 'mongoose';
import {PlanningVacationInterface} from '../interfaces/planning-vacation.interface';
import {PlanningVacationSchema} from '../schemas/planning-vacation.schema';

export interface PlanningVacationModelInterface extends PlanningVacationInterface, Document {}

export interface PlanningVacationModelInterfaceStatic extends Model<PlanningVacationModelInterface> {}

export const PlanningVacationModel = mongoose.model<PlanningVacationModelInterface, PlanningVacationModelInterfaceStatic>('planningvacations', PlanningVacationSchema);
