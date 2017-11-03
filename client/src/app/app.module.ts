import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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

import {ScheduleComponent} from './planning.component';
import {PlanningApiService} from './shared/services/planning.api.service';
import {AddTaskComponent} from './app-new-task.component';
import {AddResourceComponent} from './app-new-resource.component';
import {CommonModule} from '@angular/common';
import {DragulaModule} from 'ng2-dragula';
import {UIActionsService} from './shared/services/ui.actions.service';
// Material design modules
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material/';
import {MAT_DATE_LOCALE, MatDatepickerModule, MatNativeDateModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScheduleComponent,
    ResourcesComponent,
    AddTaskComponent,
    AddResourceComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragulaModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
      /*delay: 100*/
    })
  ],
  entryComponents: [
    AddTaskComponent,
    AddResourceComponent
  ],
  exports: [
    AddTaskComponent,
    AddResourceComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PlanningApiService, UIActionsService, MatDialogModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-US'}],
  bootstrap: [
    AppComponent]
})
export class AppModule {
}
