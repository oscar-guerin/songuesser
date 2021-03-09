import { Column, Id } from '@witty-services/ngx-repository';

export class Artist {

  @Id()
  public id: string;

  @Column()
  public name: string;
}
