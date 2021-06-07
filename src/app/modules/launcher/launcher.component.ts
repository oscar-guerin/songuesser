import { Component } from '@angular/core';
import { Track } from '../@core/models/track.model';
import { LauncherService } from '../@core/services/launcher.service';
import { GameService } from '../@core/services/game.service';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../@core/services/user.service';
import { first, map } from 'rxjs/operators';
import { User } from '../@core/models/user.model';
import { OnDestroyListener, takeUntilDestroy } from '@witty-services/ngx-common';
import { last } from 'lodash';
import { Observable } from 'rxjs';
import { softCache } from '@witty-services/rxjs-common';

@OnDestroyListener()
@Component({
  templateUrl: './launcher.component.html'
})
export class LauncherComponent {

  public readonly removePlayerNameDisabled$: Observable<boolean>;

  public readonly playerNamesForm: FormArray;

  public constructor(private readonly launcherService: LauncherService,
                     private readonly gameService: GameService,
                     private readonly userService: UserService,
                     private readonly fb: FormBuilder) {
    this.playerNamesForm = fb.array([]);

    this.removePlayerNameDisabled$ = this.playerNamesForm.valueChanges.pipe(
      map((value: string[]) => value.length === 1),
      softCache()
    );

    this.userService.getCurrentUser().pipe(
      first()
    ).subscribe((user: User) => this.playerNamesForm.push(new FormControl(user.displayName)));

    this.playerNamesForm.valueChanges.pipe(
      takeUntilDestroy(this)
    ).subscribe((value: string[]) => !!last(value) ? this.playerNamesForm.push(new FormControl()) : void 0);
  }

  public removePlayerName(index: number): void {
    this.playerNamesForm.removeAt(index);
  }

  public onSeed(seed: Track): void {
    if (!!seed) {
      this.launcherService.addSeedTrack(seed);
    }
  }

  public launch(): void {
    this.launcherService.setPlayerNames(this.playerNamesForm.value);
    this.gameService.launch();
  }
}
