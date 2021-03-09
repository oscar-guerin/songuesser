import { Pipe, PipeTransform } from '@angular/core';
import { Artist } from '../../@core/models/artist.model';

@Pipe({
  name: 'artist'
})

export class ArtistPipe implements PipeTransform {

  public transform(value: Artist | Artist[]): string {
    return Array.isArray(value) ? value.map((artist: Artist) => artist.name).join(', ') : value.name;
  }
}
