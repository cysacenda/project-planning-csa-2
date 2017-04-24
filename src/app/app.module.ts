import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {HeaderComponent} from './shared/layout/header.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent]
})
export class AppModule { }
