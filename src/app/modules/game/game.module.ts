import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

const COMPONENTS: any[] = [
  GameComponent
];

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    ...COMPONENTS
  ],
  providers: [],
})
export class GameModule {
}
