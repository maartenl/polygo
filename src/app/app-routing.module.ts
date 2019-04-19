import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordgameComponent } from './wordgame/wordgame.component';
import { WordsComponent } from './words/words.component';
import { LessonsComponent } from './lessons/lessons.component';
import { WordgameTimedComponent } from './wordgame-timed/wordgame-timed.component';

const routes: Routes = [
  { path: '', redirectTo: '/wordgame', pathMatch: 'full' },
  { path: 'wordgame', component: WordgameComponent },
  { path: 'wordgame-timed', component: WordgameTimedComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'words', component: WordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
