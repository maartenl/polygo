import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordgameComponent } from './wordgame/wordgame.component';

const routes: Routes = [
  { path: 'wordgame', component: WordgameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
