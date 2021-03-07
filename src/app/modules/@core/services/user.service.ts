import { Injectable } from '@angular/core';
import { HttpRepository } from '@witty-services/ngx-http-repository';
import { InjectRepository } from '@witty-services/ngx-repository';
import { hardCache, ifNotNull } from '@witty-services/rxjs-common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../../@system/services/auth.service';

@Injectable()
export class UserService {

  @InjectRepository({resourceType: () => User, repository: () => HttpRepository})
  private readonly repository: HttpRepository<User, string>;

  private readonly currentUser$: Observable<User>;

  public constructor(readonly authService: AuthService) {
    this.currentUser$ = authService.getAccessToken().pipe(
      ifNotNull(),
      switchMap(() => this.repository.findOne()),
      hardCache(),
    );
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser$;
  }
}
