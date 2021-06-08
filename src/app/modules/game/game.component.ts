import { Component } from '@angular/core';
import { GameService } from '../@core/services/game.service';
import { from, interval, merge, Observable, zip } from 'rxjs';
import { Track } from '../@core/models/track.model';
import { delay, first, map, startWith, switchMap } from 'rxjs/operators';
import { softCache, toHotArray } from '@witty-services/rxjs-common';
import { Player } from '../@core/models/player.model';
import { reverse } from 'lodash';
import { Router } from '@angular/router';

@Component({
  templateUrl: './game.component.html'
})
export class GameComponent {

  public readonly currentTrack$: Observable<Track>;
  public readonly players$: Observable<Player[]>;
  public readonly reveal$: Observable<boolean>;
  public readonly trackHistory$: Observable<Track[]>;

  public constructor(private readonly gameService: GameService,
                     private readonly router: Router) {
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
      map(([track, _]: [Track, number]) => track),
      softCache()
    );

    this.reveal$ = merge(
      this.currentTrack$.pipe(
        map(() => false)
      ),
      this.currentTrack$.pipe(
        delay(20000),
        map(() => true)
      )
    ).pipe(
      softCache()
    );

    this.players$ = gameService.getPlayers().pipe(
      softCache()
    );

    this.trackHistory$ = this.currentTrack$.pipe(
      toHotArray(),
      map(reverse),
      map((tracks: Track[]) => [...tracks.slice(1)])
    );

    this.gameService.canGameStart().pipe(
      first()
    ).subscribe((value: boolean) => !value ? router.navigate(['/', 'app', 'launcher']) : void 0);
  }
}
