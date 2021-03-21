import { InjectRepository } from '@witty-services/ngx-repository';
import { HttpRepository } from '@witty-services/ngx-http-repository';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Track } from '../models/track.model';
import { map } from 'rxjs/operators';
import { Recommendations } from '../models/recommendations.model';
import { RecommendationsQuery } from '../queries/recommendations.query';

@Injectable()
export class RecommendationsService {

  @InjectRepository({resourceType: () => Recommendations, repository: () => HttpRepository})
  private readonly repository: HttpRepository<Recommendations, string>;

  public findRecommendations(seedTracks: Track[]): Observable<Track[]> {
    return this.repository.findOne(new RecommendationsQuery({
      seedTracks: seedTracks.map(Track.getId).join(','),
      minPopularity: 60
    })).pipe(
      map((result: Recommendations) => result.tracks)
    );
  }
}
