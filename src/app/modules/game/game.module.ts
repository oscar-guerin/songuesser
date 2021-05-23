import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { TrackPlayerComponent } from './track-player/track-player.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

const COMPONENTS: any[] = [
  GameComponent,
  TrackPlayerComponent
];

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    RoundProgressModule
  ],
  exports: [],
  declarations: [
    ...COMPONENTS
  ],
  providers: [],
})
export class GameModule {
}
