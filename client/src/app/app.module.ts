import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
  MdGridListModule,
  MdCardModule,
  MdSelectModule,
  MdOptionModule
} from '@angular/material';
import {ScheduleComponent} from './planning.component';
import {PlanningService} from './shared/services/planning.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScheduleComponent,
    ResourcesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdToolbarModule,
    MdMenuModule,
    MdButtonModule,
    MdIconModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdCardModule,
    MdSelectModule,
    MdOptionModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
      /*delay: 100*/})
  ],
  providers: [PlanningService],
  bootstrap: [
    AppComponent]
})
export class AppModule {
}
