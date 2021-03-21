import { Column, Id } from '@witty-services/ngx-repository';
import { Track } from './track.model';
import { HttpResource } from '@witty-services/ngx-http-repository';

@HttpResource({
  read: '/spotify/recommendations'
})
export class Recommendations {

  @Id()
  public id: string;

  @Column({field: 'tracks', type: () => Track})
  public tracks: Track[];
}
