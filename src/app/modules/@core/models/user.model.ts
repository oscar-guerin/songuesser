import { HttpResource } from '@witty-services/ngx-http-repository';
import { Column, Id } from '@witty-services/ngx-repository';

export class Image {

  @Column()
  public url: string;
}

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
