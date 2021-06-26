import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { delay, filter, first, retryWhen, switchMap, take } from 'rxjs/operators';
import { ifNotNull } from '@witty-services/rxjs-common';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public static readonly ANONYMOUS_URLS: string[] = [
    environment.api.url
  ];

  public constructor(private readonly injector: Injector) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (AuthInterceptor.ANONYMOUS_URLS.find((url: string) => req.url.includes(url))) {
      return next.handle(req);
    }

    return this.injector.get(AuthService).getAccessToken().pipe(
      ifNotNull(),
      first(),
      switchMap((token: string) => next.handle(req.clone({
        headers: req.headers.append('Authorization', `Bearer ${ token }`)
      }))),
      retryWhen((err$: Observable<any>) => err$.pipe(
        filter((err: any) => err instanceof HttpErrorResponse),
        filter((err: HttpErrorResponse) => err.status === 429),
        delay(1000),
        take(5)
      ))
    );
  }
}
