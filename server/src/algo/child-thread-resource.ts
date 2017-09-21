'use strict';
// module dependencies
import {PlanningAlgo} from './planning-algorithm';


// Build partial planning
const algo = new PlanningAlgo();
algo.CalculPlanningForResource(process.argv[2])
  .catch(
    error => console.log(error.stack)
  ).then(() =>
  process.exit());
