import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WordgameComponent } from './wordgame/wordgame.component';
import { WordgameTimedComponent } from './wordgame-timed/wordgame-timed.component';
import { WordsComponent } from './words/words.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ErrorsComponent } from './errors/errors.component';

@NgModule({
  declarations: [
    AppComponent,
    WordgameComponent,
    WordgameTimedComponent,
    WordsComponent,
    LessonsComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
