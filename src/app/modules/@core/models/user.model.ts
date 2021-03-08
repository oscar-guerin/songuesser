import { HttpResource } from '@witty-services/ngx-http-repository';
import { Column, Id } from '@witty-services/ngx-repository';
import { Image } from './image.model';

@HttpResource({
  read: '/spotify/me'
})
export class User {

  @Id()
  public id: string;

  @Column('display_name')
  public displayName: string;

  @Column(() => Image)
  public images: Image[];
}
