import { Component } from '@angular/core';
import { TrackService } from '../@core/services/track.service';
import { Track } from '../@core/models/track.model';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public constructor(private readonly trackService: TrackService) {
    trackService.findById('4xkOaSrkexMciUUogZKVTS').subscribe((track: Track) => {
      const audio: HTMLAudioElement = new Audio(track.previewUrl);
      audio.play();
    });
  }
}
