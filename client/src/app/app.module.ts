import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/layout/header.component';
import {ResourcesComponent} from './resources.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import {AppRoutingModule} from './app-routing.module';

/* TODO : A suprimer quand vraie données depuis API */
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './shared/services/in-memory-data.service';

// Material design modules
import {
  MdToolbarModule,
  MdMenuModule,
  MdButtonModule,
  MdIconModule,
  MdSlideToggleModule,
  MdSelectModule,
  MdOptionModule,
  MdDialogModule,
  MdInputModule
} from '@angular/material';
import {ScheduleComponent} from './planning.component';
import {PlanningService} from './shared/services/planning.service';
import {AddTaskComponent} from './app-new-task.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScheduleComponent,
    ResourcesComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdToolbarModule,
    MdMenuModule,
    MdButtonModule,
    MdIconModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdOptionModule,
    MdDialogModule,
    MdInputModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
      /*delay: 100*/
    })
  ],
  entryComponents: [
    AddTaskComponent
  ],
  exports: [
    AddTaskComponent,
    FormsModule, // TODO : Added for bug
    ReactiveFormsModule // TODO : Added for bug
  ],
  providers: [PlanningService, MdDialogModule],
  bootstrap: [
    AppComponent]
})
export class AppModule {
}
