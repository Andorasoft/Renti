import { User } from '$lib';

/**
 * Stores personal information associated with a user.
 */
export default class UserProfile {
  constructor(
    public id: number,
    public created_at: string,
    public first_name: string,
    public last_name: string,
    public identity_card: string | null,
    public phone: string | null,
    public user_id: number,
    public user?: User
  ) { }

  /**
   * Creates a UserProfile instance from a JSON object.
   */
  static fromJSON(obj: any): UserProfile {
    return new UserProfile(
      obj.id,
      obj.created_at,
      obj.first_name,
      obj.last_name,
      obj.identity_card ?? null,
      obj.phone ?? null,
      obj.user_id,
      obj.user ? User.fromJSON(obj.user) : undefined
    );
  }

  /**
   * Serializes the UserProfile instance to JSON.
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      first_name: this.first_name,
      last_name: this.last_name,
      identity_card: this.identity_card,
      phone: this.phone,
      user_id: this.user_id,
      user: this.user?.toJSON()
    };
  }
}
