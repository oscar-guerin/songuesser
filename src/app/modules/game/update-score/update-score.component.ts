import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../@core/models/player.model';
import { GameService } from '../../@core/services/game.service';

@Component({
  selector: 'sgr-update-score',
  templateUrl: 'update-score.component.html'
})
export class UpdateScoreComponent {

  @Input()
  public type: 'song' | 'artist';
  @Input()
  public players: Player[];

  @Output()
  public readonly done$: EventEmitter<void> = new EventEmitter<void>();

  public constructor(private readonly gameService: GameService) {
  }

  public updateScore(player: Player): void {
    this.gameService.updateScore(player, 1);
    this.done();
  }

  public done(): void {
    this.done$.emit();
  }
}
