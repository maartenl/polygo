import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordgameComponent } from './wordgame/wordgame.component';
import { WordsComponent } from './words/words.component';

const routes: Routes = [
  { path: '', redirectTo: '/wordgame', pathMatch: 'full' },
  { path: 'wordgame', component: WordgameComponent },
  { path: 'words', component: WordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
