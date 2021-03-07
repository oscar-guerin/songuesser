import { Track } from '../models/track.model';
import { HttpRepository } from '@witty-services/ngx-http-repository';
import { InjectRepository } from '@witty-services/ngx-repository';
import { Observable } from 'rxjs';

export class TrackService {

  @InjectRepository({resourceType: () => Track, repository: () => HttpRepository})
  private readonly repository: HttpRepository<Track, string>;

  public findById(id: string): Observable<Track> {
    return this.repository.findById(id);
  }
}
