import Currency from './Currency';

/**
 * Represents a country and its associated currency and phone code.
 */
export default class Country {
  /**
   * Unique identifier of the country.
   */
  public id: number;

  /**
   * Timestamp when the country was created.
   */
  public created_at: string;

  /**
   * Official name of the country.
   */
  public name: string;

  /**
   * ISO 3166-1 alpha-2 code (e.g., US, EC).
   */
  public iso2: string;

  /**
   * ISO 3166-1 alpha-3 code (e.g., USA, ECU).
   */
  public iso3: string;

  /**
   * Country phone code (e.g., +1, +593).
   */
  public phone_code: string;

  /**
   * Foreign key to the currency used in the country.
   */
  public currency_id: number;

  /**
   * Optional currency object (expanded reference).
   */
  public currency?: Currency;

  constructor(
    id: number,
    created_at: string,
    name: string,
    iso2: string,
    iso3: string,
    phone_code: string,
    currency_id: number,
    currency?: Currency
  ) {
    this.id = id;
    this.created_at = created_at;
    this.name = name;
    this.iso2 = iso2;
    this.iso3 = iso3;
    this.phone_code = phone_code;
    this.currency_id = currency_id;
    this.currency = currency;
  }

  /**
   * Creates a new instance of Country from a plain JSON object.
   * @param obj JSON object
   * @returns Country instance
   */
  static fromJSON(obj: any): Country {
    return new Country(
      obj.id,
      obj.created_at,
      obj.name,
      obj.iso2,
      obj.iso3,
      obj.phone_code,
      obj.currency_id,
      obj.currency ? Currency.fromJSON(obj.currency) : undefined
    );
  }

  /**
   * Converts the Country instance into a JSON object.
   * @returns JSON object representation
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      name: this.name,
      iso2: this.iso2,
      iso3: this.iso3,
      phone_code: this.phone_code,
      currency_id: this.currency_id,
      currency: this.currency?.toJSON()
    };
  }
}
