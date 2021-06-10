import { Component } from '@angular/core';
import { GameService } from '../@core/services/game.service';
import { combineLatest, from, interval, merge, Observable, zip } from 'rxjs';
import { Track } from '../@core/models/track.model';
import { delay, first, map, scan, startWith, switchMap } from 'rxjs/operators';
import { softCache, toHotArray } from '@witty-services/rxjs-common';
import { Player } from '../@core/models/player.model';
import { reverse } from 'lodash';
import { Router } from '@angular/router';
import { OnDestroyListener, takeUntilDestroy } from '@witty-services/ngx-common';

@OnDestroyListener()
@Component({
  templateUrl: './game.component.html'
})
export class GameComponent {

  public showSongUpdateScoreCard: boolean = true;
  public showArtistUpdateScoreCard: boolean = true;

  public readonly currentTrack$: Observable<Track>;
  public readonly players$: Observable<Player[]>;
  public readonly reveal$: Observable<boolean>;
  public readonly trackHistory$: Observable<Track[]>;
  public readonly remainingTracks$: Observable<number>;

  public constructor(private readonly gameService: GameService,
                     private readonly router: Router) {
    const tracks$: Observable<Track[]> = gameService.getTracks().pipe(
      softCache()
    );

    const totalTracks$: Observable<number> = tracks$.pipe(
      map((tracks: Track[]) => tracks.length),
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

    this.remainingTracks$ = combineLatest([
      totalTracks$,
      this.currentTrack$.pipe(
        scan((acc: number) => acc + 1, -1)
      )
    ]).pipe(
      map(([total, decrement]: number[]) => total - decrement),
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

    this.reveal$.pipe(
      takeUntilDestroy(this)
    ).subscribe((reveal: boolean) => {
      this.showSongUpdateScoreCard = reveal;
      this.showArtistUpdateScoreCard = reveal;
    });
  }
}
