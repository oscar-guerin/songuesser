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
}
