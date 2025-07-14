/**
 * Represents a currency used in countries and lease agreements.
 */
export class Currency {
  /** Unique identifier of the currency */
  id: number;

  /** Full name of the currency (e.g., Peso colombiano) */
  name: string;

  /** ISO code of the currency (e.g., COP, USD) */
  code: string;

  /** Symbol of the currency (e.g., $, S/.) */
  symbol: string;

  /**
   * Creates a new Currency instance.
   *
   * @param id - Unique identifier
   * @param name - Full currency name
   * @param code - ISO currency code
   * @param symbol - Currency symbol used in prices
   */
  constructor(id: number, name: string, code: string, symbol: string) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.symbol = symbol;
  }

  /**
   * Parses a JSON object into a Currency instance.
   *
   * @param json - Raw object to convert
   * @returns A valid Currency instance
   * @example
   * const currency = Currency.fromJSON({ id: 1, name: 'Peso colombiano', code: 'COP', symbol: '$' });
   */
  static fromJSON(json: any): Currency {
    return new Currency(json.id, json.name, json.code, json.symbol);
  }

  /**
   * Converts the Currency instance to a JSON object.
   *
   * @returns A JSON-compatible representation of the currency
   */
  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      symbol: this.symbol,
    };
  }
}
