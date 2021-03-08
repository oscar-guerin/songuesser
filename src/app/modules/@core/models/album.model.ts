import { Column, Id } from '@witty-services/ngx-repository';
import { Image } from './image.model';

export class Album {

  @Id()
  public id: string;

  @Column()
  public name: string;

  @Column(() => Image)
  public images: Image[];
}
