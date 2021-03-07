import { Column, Id } from '@witty-services/ngx-repository';
import { HttpResource } from '@witty-services/ngx-http-repository';

@HttpResource({
  read: '/spotify/tracks'
})
export class Track {

  @Id()
  public id: string;

  @Column()
  public name: string;

  @Column('preview_url')
  public previewUrl: string;
}
