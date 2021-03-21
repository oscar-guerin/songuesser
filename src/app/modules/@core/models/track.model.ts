import { Column, Id } from '@witty-services/ngx-repository';
import { HttpResource } from '@witty-services/ngx-http-repository';
import { Album } from './album.model';
import { Artist } from './artist.model';

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

  @Column(() => Artist)
  public artists: Artist[];

  @Column('preview_url')
  public previewUrl: string;

  public static getId(track: Track): string {
    return track.id;
  }

  public static hasPreviewUrl(track: Track): boolean {
    return !!track.previewUrl;
  }
}
