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
import {ScheduleComponent} from './schedule.component';

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
  ],
  providers: [],
  bootstrap: [
    AppComponent]
})
export class AppModule {
}
