import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../@core/models/user.model';
import { UserService } from '../../../@core/services/user.service';
import { softCache } from '@witty-services/rxjs-common';
import { NbMenuBag, NbMenuItem, NbMenuService } from '@nebular/theme';
import { filter, first } from 'rxjs/operators';
import { AuthService } from '../../../@system/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sgr-header',
  templateUrl: './header.component.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class HeaderComponent {

  public readonly currentUser$: Observable<User>;

  public readonly menuItems: NbMenuItem[] = [
    {
      title: this.translateService.instant('shared.logout'),
      icon: 'unlock-outline',
    },
  ];

  public constructor(private readonly userService: UserService,
                     private readonly nbMenuService: NbMenuService,
                     private readonly authService: AuthService,
                     private readonly translateService: TranslateService,
                     private readonly router: Router) {
    this.currentUser$ = userService.getCurrentUser().pipe(
      softCache()
    );

    this.nbMenuService.onItemClick().pipe(
      filter((menuBag: NbMenuBag) => menuBag.tag === 'user-context-menu' && menuBag.item.title === 'Logout'),
      first()
    ).subscribe(() => {
      authService.signOut();
      router.navigate(['/', 'sign']);
    });
  }
}
