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
      padding-left: 1.5rem;
    }

    a {
      text-decoration: none;
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }

    a:hover {
      border-bottom: 2px solid var(--color-primary-500);
    }

    a nb-icon {
      font-size: 1.5rem;
    }

    a span {
      color: var(--color-primary-500);
      font-weight: bold;
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
