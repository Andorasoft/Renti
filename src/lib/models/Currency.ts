/**
 * Represents a currency used in one or more countries.
 */
export default class Currency {
  constructor(
    public id: number,
    public created_at: string,
    public name: string,
    public code: string,
    public symbol?: string
  ) { }

  /**
   * Creates a Currency instance from a plain JSON object.
   * @param obj JSON object
   */
  static fromJSON(obj: any): Currency {
    return new Currency(
      obj.id,
      obj.created_at,
      obj.name,
      obj.code,
      obj.symbol
    );
  }

  /**
   * Serializes the Currency instance to JSON.
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      name: this.name,
      code: this.code,
      symbol: this.symbol
    };
  }
}