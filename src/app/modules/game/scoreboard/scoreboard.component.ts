import { Component, Input } from '@angular/core';
import { Player } from '../../@core/models/player.model';

@Component({
  selector: 'sgr-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {

  @Input()
  public players: Player[];
}
