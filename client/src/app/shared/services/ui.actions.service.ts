import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {PlanningTask} from '../models/planning-task.model';
import {PlanningResource} from '../models/planning-resource.model';

@Injectable()
export class UIActionsService {

  // Observable string sources
  private actionTriggeredSource = new Subject<HeaderAction>();
  private dialogTaskActionCreateTriggeredSource = new Subject<PlanningTask>();
  dialogTaskActionCreateTriggered$ = this.dialogTaskActionCreateTriggeredSource.asObservable();
  private dialogTaskActionUpdateTriggeredSource = new Subject<PlanningTask>();
  dialogTaskActionUpdateTriggered$ = this.dialogTaskActionUpdateTriggeredSource.asObservable();

  // Observable string streams
  actionTriggered$ = this.actionTriggeredSource.asObservable();
  private dialogResourceActionCreateTriggeredSource = new Subject<PlanningResource>();
  dialogResourceActionCreateTriggered$ = this.dialogResourceActionCreateTriggeredSource.asObservable();
  private dialogResourceActionUpdateTriggeredSource = new Subject<PlanningResource>();
  dialogResourceActionUpdateTriggered$ = this.dialogResourceActionUpdateTriggeredSource.asObservable();

  // Service message commands
  actionTriggered(action: HeaderAction) {
    this.actionTriggeredSource.next(action);
  }

  dialogTaskActionCreateTriggered(task: PlanningTask) {
    this.dialogTaskActionCreateTriggeredSource.next(task);
  }

  dialogTaskActionUpdateTriggered(task: PlanningTask) {
    this.dialogTaskActionUpdateTriggeredSource.next(task);
  }

  dialogResourceActionCreateTriggered(resource: PlanningResource) {
    this.dialogResourceActionCreateTriggeredSource.next(resource);
  }

  dialogResourceActionUpdateTriggered(resource: PlanningResource) {
    this.dialogResourceActionUpdateTriggeredSource.next(resource);
  }
}

export enum HeaderAction {
  Previous,
  Next,
  Today
}
