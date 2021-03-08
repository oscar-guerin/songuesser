import { Column, Id } from '@witty-services/ngx-repository';
import { HttpResource } from '@witty-services/ngx-http-repository';
import { Album } from './album.model';

@HttpResource({
  read: '/spotify/tracks'
})
export class Track {

  @Id()
  public id: string;

  @Column()
  public name: string;

  @Column(() => Album)
  public album: Album;

  @Column('preview_url')
  public previewUrl: string;
}
