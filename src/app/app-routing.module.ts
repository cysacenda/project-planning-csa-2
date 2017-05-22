import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ScheduleComponent} from './schedule.component';
import {ResourcesComponent} from './resources.component';

const routes: Routes = [
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'resources', component: ResourcesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
