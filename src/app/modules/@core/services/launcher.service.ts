import { Injectable } from '@angular/core';
import { Track } from '../models/track.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { map } from 'rxjs/operators';

@Injectable()
export class LauncherService {

  private readonly seedTracks$: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([]);
  private readonly playerNames$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public addSeedTrack(track: Track): void {
    this.seedTracks$.next([...this.seedTracks$.getValue(), track]);
  }

  public getSeedTracks(): Observable<Track[]> {
    return this.seedTracks$;
  }

  public setPlayerNames(names: string[]): void {
    this.playerNames$.next(names);
  }

  public getPlayers(): Observable<Player[]> {
    return this.playerNames$.pipe(
      map((names: string[]) => names.filter((name: string) => !!name).map(Player.fromName))
    );
  }
}
