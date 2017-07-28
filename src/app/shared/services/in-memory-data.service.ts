/* TODO : A suprimer quand vraie données depuis API */

import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects = [
      {id: 1, name: 'DC Mobile'},
      {id: 2, name: 'DC AE'},
      {id: 3, name: 'P&F'}
    ];
    const positions = [
      {id: 1, name: '1'},
      {id: 2, name: '2'},
      {id: 3, name: '3'}
    ];
    const resources = [
      {id: 1, name: 'Cyril S.'},
      {id: 2, name: 'Mohamed B.'},
      {id: 3, name: 'Rudy J.'}
    ];
    const planningTasks = [
      {id: 1, name: 'Install API GW', workload: 5.5, etc: 2.25, position: 1, resourceId: 1, projectId: 1, daysMap: [['2017-06-12T00:00:00.000Z', 1], ['2017-06-13T00:00:00.000Z', 0.5]]},
      {id: 2, name: 'Config API GW', workload: 1.5, etc: 0, position: 2, resourceId: 2, projectId: 1, daysMap: [['2017-06-12T00:00:00.000Z', 1], ['2017-06-13T00:00:00.000Z', 0.5]]},
      {id: 4, name: 'Deploy API GW', workload: 0.5, etc: 0.5, position: 3, resourceId: 1, projectId: 1, daysMap: [['2017-06-12T00:00:00.000Z', 1], ['2017-06-13T00:00:00.000Z', 0.5]]},
      {id: 3, name: 'Test API GW', workload: 1, etc: 1, position: 4, resourceId: 2, projectId: 1, daysMap: [['2017-06-12T00:00:00.000Z', 1], ['2017-06-13T00:00:00.000Z', 1]]}
    ];
    const planningParams = {currentDate: '2017-06-12T00:00:00.000Z'};

    return {projects, positions, resources, planningTasks, planningParams};
  }
}
