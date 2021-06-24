import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent {

  public readonly loginUrl: string =
    `https://accounts.spotify.com/authorize?client_id=${ environment.spotify.clientId }&response_type=code&state=sgr&redirect_uri=${ environment.spotify.redirectUri }`;

  public constructor() {
  }
}
