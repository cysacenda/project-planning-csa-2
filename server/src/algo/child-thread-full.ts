'use strict';
// module dependencies
import {PlanningAlgo} from './planning-algorithm';


// Build full planning
const algo = new PlanningAlgo();
algo.CalculFullPlanning()
  .catch(
    error => console.log(error.stack)
  )
  .then(() =>
    process.exit());
