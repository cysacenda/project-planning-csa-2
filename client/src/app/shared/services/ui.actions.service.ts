import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {PlanningTask} from '../models/planning-task.model';

@Injectable()
export class UIActionsService {

  // Observable string sources
  private actionTriggeredSource = new Subject<HeaderAction>();
  private dialogActionTriggeredSource = new Subject<PlanningTask>();

  // Observable string streams
  actionTriggered$ = this.actionTriggeredSource.asObservable();
  dialogActionTriggered$ = this.dialogActionTriggeredSource.asObservable();

  // Service message commands
  actionTriggered(action: HeaderAction) {
    this.actionTriggeredSource.next(action);
  }

  dialogActionTriggered(task: PlanningTask, action: DialogAction) {
    this.dialogActionTriggeredSource.next(task);
  }
}

export enum HeaderAction {
  Previous,
  Next,
  Today
}

export enum DialogAction {
  Create,
  Update
}
