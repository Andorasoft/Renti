import { Currency } from "./Currency";

/**
 * Represents a country, including its phone code and associated currency.
 */
export class Country {
  /** Unique identifier of the country */
  id: number;

  /** Name of the country (e.g., Colombia) */
  name: string;

  /** ISO 2-letter code (e.g., CO) */
  iso2: string;

  /** ISO 3-letter code (e.g., COL) */
  iso3: string;

  /** International phone code (e.g., 57 for Colombia) */
  phone_code: string;

  /** Foreign key for the associated currency */
  currency_id: number;

  /** Full currency object if included */
  currency?: Currency;

  /**
   * Creates a new Country instance.
   * @param id - Country ID
   * @param name - Name of the country
   * @param iso2 - ISO 2-letter code
   * @param iso3 - ISO 3-letter code
   * @param phone_code - International phone code
   * @param currency_id - Associated currency ID
   * @param currency - Optional Currency object
   */
  constructor(
    id: number,
    name: string,
    iso2: string,
    iso3: string,
    phone_code: string,
    currency_id: number,
    currency?: Currency
  ) {
    this.id = id;
    this.name = name;
    this.iso2 = iso2;
    this.iso3 = iso3;
    this.phone_code = phone_code;
    this.currency_id = currency_id;
    this.currency = currency;
  }

  /**
   * Parses a JSON object into a Country instance.
   * @param json - Raw object to convert
   * @returns A valid Country instance
   */
  static fromJSON(json: any): Country {
    return new Country(
      json.id,
      json.name,
      json.iso2,
      json.iso3,
      json.phone_code,
      json.currency_id,
      json.currency ? Currency.fromJSON(json.currency) : undefined
    );
  }

  /**
   * Converts the Country instance to a JSON object.
   * @returns A JSON-compatible representation of the country
   */
  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      iso2: this.iso2,
      iso3: this.iso3,
      phone_code: this.phone_code,
      currency_id: this.currency_id,
      currency: this.currency?.toJSON(),
    };
  }
}