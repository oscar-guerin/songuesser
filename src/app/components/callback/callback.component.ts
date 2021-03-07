import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from '../../modules/@system/services/auth.service';

@Component({
  template: ''
})
export class CallbackComponent {

  // TODO error management (user denies)
  public constructor(private readonly route: ActivatedRoute,
                     private readonly router: Router,
                     private readonly authService: AuthService) {
    route.queryParamMap.pipe(
      filter((params: ParamMap) => params.get('state') === 'sgr'),
      switchMap((params: ParamMap) => authService.authenticate(params.get('code')))
    ).subscribe(() => router.navigate(['/', 'app', 'home']));
  }
}
