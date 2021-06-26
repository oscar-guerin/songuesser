import { Component } from '@angular/core';
import { GameService } from '../../@core/services/game.service';
import { softCache } from '@witty-services/rxjs-common';
import { Observable } from 'rxjs';
import { Player } from '../../@core/models/player.model';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent {

  public readonly players$: Observable<Player[]>;
  public readonly winnerName$: Observable<string>;

  public constructor(private readonly gameService: GameService) {
    this.players$ = gameService.getPlayers().pipe(
      map(Player.leaderboard),
      softCache()
    );

    this.winnerName$ = this.players$.pipe(
      map(Player.winner),
      softCache()
    );
  }
}
