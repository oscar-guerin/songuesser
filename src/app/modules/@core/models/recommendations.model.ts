import { Column, Id } from '@witty-services/ngx-repository';
import { Track } from './track.model';
import { HttpResource } from '@witty-services/ngx-http-repository';
import { environment } from '../../../../environments/environment';

@HttpResource({
  read: `${ environment.spotify.url }/recommendations`
})
export class Recommendations {

  @Id()
  public id: string;

  @Column({field: 'tracks', type: () => Track})
  public tracks: Track[];
}
