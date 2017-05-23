/* TODO : A suprimer quand vraie données depuis API */

import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects = [
      { id: 1, name: 'DC Mobile' },
      { id: 2, name: 'DC AE' },
      { id: 3, name: 'P&F' }
    ];
    const positions = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' }
    ];
    const resources = [
      { id: 1, name: 'Cyril S.' },
      { id: 2, name: 'Mohamed B.' },
      { id: 3, name: 'Rudy J.' }
    ];
    return { projects, positions, resources };
  }
}
