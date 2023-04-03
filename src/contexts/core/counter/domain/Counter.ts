export interface CounterDTO {
  count: number;
  lastUpdate: Date;
}

export class Counter {
  static readonly ID = "counterIdentifier";
  private _count: number;
  private _lastUpdate: Date;

  constructor(count: number, lastUpdate: Date = new Date()) {
    this._count = count;
  }

  get count(): number {
    return this._count;
  }

  public asDTO(): CounterDTO {
    return {
      count: this._count,
      lastUpdate: this._lastUpdate,
    };
  }

  public increment(): void {
    this._count = this._count + 1;
    this._lastUpdate = new Date();
  }

  public static fromDTO(counterDTO: CounterDTO): Counter {
    return new Counter(counterDTO.count, counterDTO.lastUpdate);
  }
}
