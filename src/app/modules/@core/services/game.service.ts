import { Injectable } from '@angular/core';
import { LauncherService } from './launcher.service';
import { RecommendationsService } from './recommendations.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { Track } from '../models/track.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class GameService {

  private readonly gameTracks$: Observable<Track[]>;

  public constructor(private readonly launcherService: LauncherService,
                     private readonly recommendationsService: RecommendationsService,
                     private readonly router: Router) {
    this.gameTracks$ = launcherService.getSeedTracks().pipe(
      filter((tracks: Track[]) => tracks.length > 0),
      switchMap((seedTracks: Track[]) => recommendationsService.findRecommendations(seedTracks)),
      map((tracks: Track[]) => tracks.filter(Track.hasPreviewUrl))
    );
  }

  public launch(): void {
    this.router.navigate(['/', 'app', 'game']);
  }

  public getTracks(): Observable<Track[]> {
    return this.gameTracks$;
  }

}
