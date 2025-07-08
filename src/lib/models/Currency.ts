/**
 * Represents a currency used within the system.
 */
export default class Currency {
  /**
   * Unique identifier of the currency.
   */
  public id: number;

  /**
   * Timestamp when the currency was created.
   */
  public created_at: string;

  /**
   * Name of the currency (e.g., US Dollar).
   */
  public name: string;

  /**
   * ISO currency code (e.g., USD, EUR).
   */
  public code: string;

  /**
   * Currency symbol (e.g., $, €).
   */
  public symbol: string;

  constructor(
    id: number,
    created_at: string,
    name: string,
    code: string,
    symbol: string
  ) {
    this.id = id;
    this.created_at = created_at;
    this.name = name;
    this.code = code;
    this.symbol = symbol;
  }

  /**
   * Creates a new instance of Currency from a plain JSON object.
   * @param obj JSON object
   * @returns Currency instance
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
   * Converts the Currency instance into a JSON object.
   * @returns JSON object representation
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
