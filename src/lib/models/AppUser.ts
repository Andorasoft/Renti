import UserRole from './UserRole';
import Country from './Country';

/**
 * Represents an application user, such as an owner or tenant.
 */
export default class AppUser {
  /**
   * Unique identifier of the user.
   */
  public id: number;

  /**
   * Timestamp when the user was created.
   */
  public created_at: string;

  /**
   * Universally unique identifier (UUID) for this user.
   */
  public uuid: string;

  /**
   * First name of the user.
   */
  public first_name: string;

  /**
   * Last name of the user.
   */
  public last_name: string;

  /**
   * National identity card number. Optional and unique.
   */
  public identity_card: string | null;

  /**
   * Phone number of the user. Optional and unique.
   */
  public phone: string | null;

  /**
   * Email address of the user. Must be unique.
   */
  public email: string;

  /**
   * URL or path to the user's profile image. Optional.
   */
  public image: string | null;

  /**
   * Foreign key to the user's role.
   */
  public user_role_id: number;

  /**
   * Foreign key to the user's country.
   */
  public country_id: number;

  /**
   * Optional reference to the user role object.
   */
  public user_role?: UserRole;

  /**
   * Optional reference to the country object.
   */
  public country?: Country;

  constructor(
    id: number,
    created_at: string,
    uuid: string,
    first_name: string,
    last_name: string,
    identity_card: string | null,
    phone: string | null,
    email: string,
    image: string | null,
    user_role_id: number,
    country_id: number,
    user_role?: UserRole,
    country?: Country
  ) {
    this.id = id;
    this.created_at = created_at;
    this.uuid = uuid;
    this.first_name = first_name;
    this.last_name = last_name;
    this.identity_card = identity_card;
    this.phone = phone;
    this.email = email;
    this.image = image;
    this.user_role_id = user_role_id;
    this.country_id = country_id;
    this.user_role = user_role;
    this.country = country;
  }

  /**
   * Creates an AppUser instance from a JSON object.
   * @param obj JSON object
   * @returns AppUser instance
   */
  static fromJSON(obj: any): AppUser {
    return new AppUser(
      obj.id,
      obj.created_at,
      obj.uuid,
      obj.first_name,
      obj.last_name,
      obj.identity_card ?? null,
      obj.phone ?? null,
      obj.email,
      obj.image ?? null,
      obj.user_role_id,
      obj.country_id,
      obj.user_role ? UserRole.fromJSON(obj.user_role) : undefined,
      obj.country ? Country.fromJSON(obj.country) : undefined
    );
  }

  /**
   * Converts the AppUser instance to a JSON object.
   * @returns JSON representation
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      uuid: this.uuid,
      first_name: this.first_name,
      last_name: this.last_name,
      identity_card: this.identity_card,
      phone: this.phone,
      email: this.email,
      image: this.image,
      user_role_id: this.user_role_id,
      country_id: this.country_id,
      user_role: this.user_role,
      country: this.country
    };
  }
}
