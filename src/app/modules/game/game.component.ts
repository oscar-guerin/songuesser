import { Component } from '@angular/core';
import { GameService } from '../@core/services/game.service';
import { from, interval, Observable, zip } from 'rxjs';
import { Track } from '../@core/models/track.model';
import { map, startWith, switchMap } from 'rxjs/operators';
import { OnDestroyListener, takeUntilDestroy } from '@witty-services/ngx-common';
import { softCache } from '@witty-services/rxjs-common';

@OnDestroyListener()
@Component({
  templateUrl: './game.component.html'
})
export class GameComponent {

  public readonly currentTrack$: Observable<Track>;

  public constructor(private readonly gameService: GameService) {
    const tracks$: Observable<Track[]> = gameService.getTracks().pipe(
      softCache()
    );

    this.currentTrack$ = zip(
      tracks$.pipe(
        switchMap((tracks: Track[]) => from(tracks)),
      ),
      interval(10000).pipe(
        startWith(0)
      ),
    ).pipe(
      map(([track, _]: [Track, number]) => track)
    );

    this.currentTrack$.pipe(
      takeUntilDestroy(this)
    ).subscribe((track: Track) => {
      const audio: HTMLAudioElement = new Audio(track.previewUrl);
      audio.play();
      setTimeout(() => audio.pause(), 9999);
    });
  }
}
