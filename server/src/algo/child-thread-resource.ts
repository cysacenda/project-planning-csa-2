'use strict';

// module dependencies
import { PlanningAlgo } from './planning-algorithm';

console.log(process.argv[2]);

// Build full planning
PlanningAlgo.CalculPlanningForResource(process.argv[2]);
