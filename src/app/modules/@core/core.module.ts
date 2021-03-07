import { NgModule, Provider } from '@angular/core';
import { TrackService } from './services/track.service';
import { UserService } from './services/user.service';

const SERVICES: Provider[] = [
  TrackService,
  UserService
];

@NgModule({
  providers: [
    ...SERVICES
  ],
})
export class CoreModule {
}
