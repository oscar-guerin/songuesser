import { InjectRepository } from '@witty-services/ngx-repository';
import { HttpRepository } from '@witty-services/ngx-http-repository';
import { Search } from '../models/search-result.model';
import { SearchQuery } from '../queries/search.query';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Track } from '../models/track.model';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchService {

  @InjectRepository({resourceType: () => Search, repository: () => HttpRepository})
  private readonly repository: HttpRepository<Search, string>;

  public tracks(query: string): Observable<Track[]> {
    return this.repository.findOne(new SearchQuery({
      query,
      type: 'track'
    })).pipe(
      map((result: Search) => result.tracks)
    );
  }
}
