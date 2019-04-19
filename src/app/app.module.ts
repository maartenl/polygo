import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordgameComponent } from './wordgame/wordgame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WordsComponent } from './words/words.component';
import { LessonsComponent } from './lessons/lessons.component';
import { WordgameTimedComponent } from './wordgame-timed/wordgame-timed.component';

@NgModule({
  declarations: [
    AppComponent,
    WordgameComponent,
    WordsComponent,
    LessonsComponent,
    WordgameTimedComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
