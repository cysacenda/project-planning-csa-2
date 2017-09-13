'use strict';
// module dependencies
import {PlanningAlgo} from './planning-algorithm';


console.log(process.argv[2]);

// Build partial planning
const algo = new PlanningAlgo();
algo.CalculPlanningForResource(process.argv[2]);
