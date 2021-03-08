import { NgModule, Provider } from '@angular/core';
import { TrackService } from './services/track.service';
import { UserService } from './services/user.service';
import { SearchService } from './services/search.service';

const SERVICES: Provider[] = [
  TrackService,
  UserService,
  SearchService
];

@NgModule({
  providers: [
    ...SERVICES
  ],
})
export class CoreModule {
}
