import { Component, Input } from '@angular/core';
import { Track } from '../../@core/models/track.model';

@Component({
  selector: 'sgr-track-history',
  templateUrl: 'track-history.component.html'
})
export class TrackHistoryComponent {

  @Input()
  public tracks: Track[];
}
