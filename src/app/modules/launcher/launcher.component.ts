import { Component } from '@angular/core';
import { Track } from '../@core/models/track.model';
import { LauncherService } from '../@core/services/launcher.service';
import { GameService } from '../@core/services/game.service';

@Component({
  templateUrl: './launcher.component.html'
})
export class LauncherComponent {

  public constructor(private readonly launcherService: LauncherService,
                     private readonly gameService: GameService) {
  }

  public onSeed(seed: Track): void {
    if (!!seed) {
      this.launcherService.addSeedTrack(seed);
    }
  }

  public launch(): void {
    this.gameService.launch();
  }
}
