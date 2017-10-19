import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const reports = [
      { id: 0, owner: { id: 666, name: 'John' }, created_at: new Date(),
        what_did: ['item1', 'item2'], todo: ['item3', 'item4'], deadline: true },
      { id: 1, owner: { id: 555, name: 'Mary' }, created_at: new Date(2017,7,7),
        what_did: ['item1', 'item2'], todo: ['item3', 'item4'], deadline: false },
      { id: 2, owner: { id: 666, name: 'John' }, created_at: new Date(),
        what_did: ['item1', 'item2'], todo: ['item3', 'item4'], deadline: false },
      { id: 3, owner: { id: 222, name: 'Tomi' }, created_at: new Date(2017,2,27),
        what_did: ['item1', 'item2'], todo: ['item3', 'item4'], deadline: true },
    ];
    return {reports};
  }
}
