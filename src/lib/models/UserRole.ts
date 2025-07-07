/**
 * Defines the role of a user (e.g. admin, owner, tenant).
 */
export default class UserRole {
  constructor(
    public id: number,
    public created_at: string,
    public name: string
  ) { }

  /**
   * Creates a UserRole instance from a JSON object.
   */
  static fromJSON(obj: any): UserRole {
    return new UserRole(obj.id, obj.created_at, obj.name);
  }

  /**
   * Serializes the UserRole instance to JSON.
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      name: this.name
    };
  }
}
