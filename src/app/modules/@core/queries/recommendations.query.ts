import { HttpQueryParam } from '@witty-services/ngx-http-repository';

export class RecommendationsQuery {

  @HttpQueryParam('seed_tracks')
  public seedTracks: string;

  @HttpQueryParam('min_popularity')
  public minPopularity: number;

  public constructor(data: Partial<RecommendationsQuery>) {
    Object.assign(this, data);
  }
}
