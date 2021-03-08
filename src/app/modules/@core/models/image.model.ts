import { Column } from '@witty-services/ngx-repository';

export class Image {

  @Column()
  public url: string;
}
