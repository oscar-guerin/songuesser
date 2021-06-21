import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { TrackPlayerComponent } from './track-player/track-player.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { UpdateScoreComponent } from './update-score/update-score.component';
import { TrackHistoryComponent } from './track-history/track-history.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ResultPageComponent } from './result/result-page.component';

const COMPONENTS: any[] = [
  GameComponent,
  TrackPlayerComponent,
  UpdateScoreComponent,
  TrackHistoryComponent,
  ScoreboardComponent,
  ResultPageComponent
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
