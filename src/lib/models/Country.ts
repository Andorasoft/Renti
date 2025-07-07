import { Currency } from '$lib';

/**
 * Represents a country where users reside and properties exist.
 */
export default class Country {
  constructor(
    public id: number,
    public created_at: string,
    public name: string,
    public iso2: string,
    public iso3: string,
    public phone_code: string,
    public currency_id: number,
    public currency?: Currency
  ) { }

  /**
   * Creates a Country instance from a JSON object.
   * @param obj JSON object
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
   * Serializes the Country instance to JSON.
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
