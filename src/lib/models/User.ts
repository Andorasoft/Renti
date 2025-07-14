import { Country } from "./Country";

/**
 * Represents a user in the platform, including their personal data and country.
 */
export class User {
  /** Unique identifier of the user */
  id: number;

  /** First name of the user */
  first_name: string;

  /** Last name of the user */
  last_name: string;

  /** Identity card number (optional) */
  identity_card?: string;

  /** Phone number (optional) */
  phone?: string;

  /** Email address of the user */
  email: string;

  /** Optional profile picture URL */
  picture_url?: string;

  /** Type of account (e.g., owner, tenant) */
  account_type: string;

  /** Unique invitation code for this user */
  invite_code: string;

  /** Foreign key for the user's country */
  country_id: number;

  /** Full country object if included */
  country?: Country;

  /**
   * Creates a new User instance.
   * @param id - User ID
   * @param first_name - First name
   * @param last_name - Last name
   * @param identity_card - Identity card number
   * @param phone - Phone number
   * @param email - Email address
   * @param picture_url - Profile picture URL
   * @param account_type - Type of account
   * @param invite_code - Unique invitation code
   * @param country_id - Country foreign key
   * @param country - Optional Country object
   */
  constructor(
    id: number,
    first_name: string,
    last_name: string,
    identity_card: string | undefined,
    phone: string | undefined,
    email: string,
    picture_url: string | undefined,
    account_type: string,
    invite_code: string,
    country_id: number,
    country?: Country
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.identity_card = identity_card;
    this.phone = phone;
    this.email = email;
    this.picture_url = picture_url;
    this.account_type = account_type;
    this.invite_code = invite_code;
    this.country_id = country_id;
    this.country = country;
  }

  /**
   * Parses a JSON object into a User instance.
   * @param json - Raw object to convert
   * @returns A valid User instance
   */
  static fromJSON(json: any): User {
    return new User(
      json.id,
      json.first_name,
      json.last_name,
      json.identity_card,
      json.phone,
      json.email,
      json.picture_url,
      json.account_type,
      json.invite_code,
      json.country_id,
      json.country ? Country.fromJSON(json.country) : undefined
    );
  }

  /**
   * Converts the User instance to a JSON object.
   * @returns A JSON-compatible representation of the user
   */
  toJSON(): any {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      identity_card: this.identity_card,
      phone: this.phone,
      email: this.email,
      picture_url: this.picture_url,
      account_type: this.account_type,
      invite_code: this.invite_code,
      country_id: this.country_id,
      country: this.country?.toJSON(),
    };
  }
}