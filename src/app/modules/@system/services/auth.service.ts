import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ifNotNull, softCache } from '@witty-services/rxjs-common';

interface Token {
  accessToken: string;
  tokenType: string;
  scope: string;
  expiresIn: number;
  refreshToken?: string;
}

@Injectable()
export class AuthService {

  private readonly authToken$: Observable<Token>;
  private readonly refreshToken$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private readonly SPOTIFY_REFRESH_TOKEN_KEY: string = 'spotifyRefreshToken';

  public constructor(private readonly http: HttpClient) {

    this.refreshToken$.next(localStorage.getItem(this.SPOTIFY_REFRESH_TOKEN_KEY));
    // TODO refresh token before expiration
    this.authToken$ = this.refreshToken$.pipe(
      switchMap((refreshToken: string) => refreshToken ? this.refreshToken(refreshToken) : of(null)),
      softCache()
    );
  }

  public authenticate(code: string): Observable<Token> {
    return of(code).pipe(
      ifNotNull(),
      switchMap((c: string) => this.getTokenFromCode(c)),
      tap((token: Token) => {
        this.refreshToken$.next(token.refreshToken);
        localStorage.setItem(this.SPOTIFY_REFRESH_TOKEN_KEY, token.refreshToken);
      })
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authToken$.pipe(
      map((token: Token) => !!token)
    );
  }

  public getAccessToken(): Observable<string> {
    return this.authToken$.pipe(
      ifNotNull(),
      map((token: Token) => token.accessToken)
    );
  }

  public signOut(): void {
    localStorage.removeItem(this.SPOTIFY_REFRESH_TOKEN_KEY);
  }

  private getTokenFromCode(code: string): Observable<Token> {
    return this.http.get<Token>('/api/auth/token', {
      params: {
        redirectUri: environment.spotify.redirectUri,
        clientId: environment.spotify.clientId,
        code
      }
    });
  }

  private refreshToken(refreshToken: string): Observable<Token> {
    return this.http.get<Token>('/api/auth/refresh', {
      params: {
        clientId: environment.spotify.clientId,
        refreshToken
      }
    });
  }
}
