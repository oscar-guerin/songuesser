import { Component } from '@angular/core';
import { GameService } from '../@core/services/game.service';
import { from, interval, merge, Observable, zip } from 'rxjs';
import { Track } from '../@core/models/track.model';
import { delay, map, startWith, switchMap } from 'rxjs/operators';
import { softCache } from '@witty-services/rxjs-common';

@Component({
  templateUrl: './game.component.html'
})
export class GameComponent {

  public readonly currentTrack$: Observable<Track>;
  public readonly reveal$: Observable<boolean>;

  public constructor(private readonly gameService: GameService) {
    const tracks$: Observable<Track[]> = gameService.getTracks().pipe(
      softCache()
    );

    this.currentTrack$ = zip(
      tracks$.pipe(
        switchMap((tracks: Track[]) => from(tracks)),
      ),
      interval(32000).pipe(
        startWith(0)
      ),
    ).pipe(
      map(([track, _]: [Track, number]) => track)
    );

    this.reveal$ = merge(
      this.currentTrack$.pipe(
        map(() => false)
      ),
      this.currentTrack$.pipe(
        delay(20000),
        map(() => true)
      )
    );
  }
}
