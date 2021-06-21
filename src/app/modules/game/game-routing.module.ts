import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { ResultPageComponent } from './result/result-page.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent
  },
  {
    path: 'result',
    component: ResultPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GameRoutingModule {
}
