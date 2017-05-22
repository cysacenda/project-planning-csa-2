import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ScheduleComponent} from './schedule.component';

const routes: Routes = [
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },
  { path: 'schedule', component: ScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
