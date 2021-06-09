import { Component } from '@angular/core';
import { Track } from '../@core/models/track.model';
import { LauncherService } from '../@core/services/launcher.service';
import { GameService } from '../@core/services/game.service';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../@core/services/user.service';
import { first, map, startWith } from 'rxjs/operators';
import { User } from '../@core/models/user.model';
import { OnDestroyListener, takeUntilDestroy } from '@witty-services/ngx-common';
import { compact } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { softCache } from '@witty-services/rxjs-common';

@OnDestroyListener()
@Component({
  templateUrl: './launcher.component.html'
})
export class LauncherComponent {

  public readonly removePlayerNameDisabled$: Observable<boolean>;
  public readonly launchDisabled$: Observable<boolean>;
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

    this.launchDisabled$ = combineLatest([
      this.launcherService.getSeedTracks(),
      this.playerNamesForm.valueChanges.pipe(
        startWith(this.playerNamesForm.value as string[])
      )
    ]).pipe(
      map(([tracks, playerNames]: [Track[], string[]]) =>
        !tracks || !playerNames || tracks.length === 0 || compact(playerNames).length < 2
      ),
      softCache()
    );

    this.userService.getCurrentUser().pipe(
      first()
    ).subscribe((user: User) =>
      this.playerNamesForm.length > 0 ?
        this.playerNamesForm.at(0).setValue(user.displayName) :
        this.playerNamesForm.push(new FormControl(user.displayName))
    );

    this.playerNamesForm.valueChanges.pipe(
      startWith(this.playerNamesForm.value as string[]),
      takeUntilDestroy(this)
    ).subscribe((value: string[]) =>
      compact(value).length === value.length ? this.playerNamesForm.push(new FormControl()) : void 0
    );
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
    this.launcherService.setPlayerNames(compact(this.playerNamesForm.value));
    this.gameService.launch();
  }
}
