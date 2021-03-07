import { NgModule, Provider } from '@angular/core';
import { TrackService } from './services/track.service';

const SERVICES: Provider[] = [
  TrackService
];

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ...SERVICES
  ],
})
export class CoreModule {
}
