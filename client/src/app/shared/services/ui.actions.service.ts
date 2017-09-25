import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {PlanningTask} from '../models/planning-task.model';

@Injectable()
export class UIActionsService {

  // Observable string sources
  private actionTriggeredSource = new Subject<HeaderAction>();
  private dialogActionCreateTriggeredSource = new Subject<PlanningTask>();
  dialogActionCreateTriggered$ = this.dialogActionCreateTriggeredSource.asObservable();

  // Observable string streams
  actionTriggered$ = this.actionTriggeredSource.asObservable();
  private dialogActionUpdateTriggeredSource = new Subject<PlanningTask>();
  dialogActionUpdateTriggered$ = this.dialogActionUpdateTriggeredSource.asObservable();

  // Service message commands
  actionTriggered(action: HeaderAction) {
    this.actionTriggeredSource.next(action);
  }

  dialogActionCreateTriggered(task: PlanningTask) {
    this.dialogActionCreateTriggeredSource.next(task);
  }

  dialogActionUpdateTriggered(task: PlanningTask) {
    this.dialogActionUpdateTriggeredSource.next(task);
  }
}

export enum HeaderAction {
  Previous,
  Next,
  Today
}
