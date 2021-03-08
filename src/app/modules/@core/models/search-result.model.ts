import { Column, Id } from '@witty-services/ngx-repository';
import { Track } from './track.model';
import { HttpResource } from '@witty-services/ngx-http-repository';

@HttpResource({
  read: '/spotify/search'
})
export class Search {

  @Id()
  public id: string;

  @Column({field: 'tracks.items', type: () => Track})
  public tracks: Track[];
}
