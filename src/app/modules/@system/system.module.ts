import { NgModule, Provider } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

const SERVICES: Provider[] = [
  AuthService
];

const GUARDS: Provider[] = [
  AuthGuard
];

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ...SERVICES,
    ...GUARDS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class SystemModule {
}
