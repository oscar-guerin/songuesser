import { NgModule, Provider } from '@angular/core';
import { TrackService } from './services/track.service';
import { UserService } from './services/user.service';
import { SearchService } from './services/search.service';
import { RecommendationsService } from './services/recommendations.service';
import { LauncherService } from './services/launcher.service';
import { GameService } from './services/game.service';

const SERVICES: Provider[] = [
  TrackService,
  UserService,
  SearchService,
  RecommendationsService,
  LauncherService,
  GameService
];

@NgModule({
  providers: [
    ...SERVICES
  ],
})
export class CoreModule {
}
