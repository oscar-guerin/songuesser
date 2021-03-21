import { Injectable } from '@angular/core';
import { Track } from '../models/track.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LauncherService {

  private readonly seedTracks$: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([]);

  public addSeedTrack(track: Track): void {
    this.seedTracks$.next([...this.seedTracks$.getValue(), track]);
  }

  public getSeedTracks(): Observable<Track[]> {
    return this.seedTracks$;
  }
}
