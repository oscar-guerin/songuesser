import { maxBy, reverse, sortBy } from 'lodash';

export class Player {

  public name: string;
  public score: number;

  public constructor(data: Partial<Player> = {}) {
    Object.assign(this, data);
  }

  public static fromName(name: string): Player {
    return new Player({
      name,
      score: 0
    });
  }

  public static leaderboard(players: Player[]): Player[] {
    return reverse(sortBy(players, 'score'));
  }

  public static winner(players: Player[]): string {
    return maxBy(players, 'score')?.name || '';
  }
}
