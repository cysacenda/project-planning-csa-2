import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class HeaderService {

  // Observable string sources
  private actionTriggeredSource = new Subject<HeaderServiceAction>();

  // Observable string streams
  actionTriggered$ = this.actionTriggeredSource.asObservable();

  // Service message commands
  actionTriggered(action: HeaderServiceAction) {
    this.actionTriggeredSource.next(action);
  }
}

export enum HeaderServiceAction {
  Previous,
  Next,
  Today
}
