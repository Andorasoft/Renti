import { UserRole, Country } from '$lib';

/**
 * Represents an authenticated system user.
 */
export default class User {
  constructor(
    public id: number,
    public created_at: string,
    public uuid: string,
    public email: string,
    public user_role_id: number,
    public country_id: number,
    public user_role?: UserRole,
    public country?: Country
  ) { }

  /**
   * Creates a User instance from a JSON object.
   */
  static fromJSON(obj: any): User {
    return new User(
      obj.id,
      obj.created_at,
      obj.uuid,
      obj.email,
      obj.user_role_id,
      obj.country_id,
      obj.user_role ? UserRole.fromJSON(obj.user_role) : undefined,
      obj.country ? Country.fromJSON(obj.country) : undefined
    );
  }

  /**
   * Serializes the User instance to JSON.
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      uuid: this.uuid,
      email: this.email,
      user_role_id: this.user_role_id,
      country_id: this.country_id,
      user_role: this.user_role?.toJSON(),
      country: this.country?.toJSON()
    };
  }
}
