import { Injectable } from '@angular/core';
import { LauncherService } from './launcher.service';
import { RecommendationsService } from './recommendations.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { Track } from '../models/track.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Player } from '../models/player.model';
import { softCache } from '@witty-services/rxjs-common';

@Injectable()
export class GameService {

  private readonly gameTracks$: Observable<Track[]>;
  private readonly players$: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  public constructor(private readonly launcherService: LauncherService,
                     private readonly recommendationsService: RecommendationsService,
                     private readonly router: Router) {
    this.gameTracks$ = launcherService.getSeedTracks().pipe(
      filter((tracks: Track[]) => tracks.length > 0),
      switchMap((seedTracks: Track[]) => recommendationsService.findRecommendations(seedTracks)),
      map((tracks: Track[]) => tracks.filter(Track.hasPreviewUrl)),
      softCache()
    );

    launcherService.getPlayers().subscribe((players: Player[]) => this.players$.next(players));
  }

  public launch(): void {
    this.router.navigate(['/', 'app', 'game']);
  }

  public getTracks(): Observable<Track[]> {
    return this.gameTracks$;
  }

  public getPlayers(): Observable<Player[]> {
    return this.players$.asObservable();
  }

  public updateScore(playerToUpdate: Player, score: number): void {
    this.players$.next(this.players$.getValue().map((player: Player) =>
      player.name === playerToUpdate.name ? new Player({
        ...playerToUpdate,
        score: playerToUpdate.score + score
      }) : player));
  }
}
