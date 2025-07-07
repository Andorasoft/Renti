import { User } from '$lib/models';

/**
 * Represents a building owned by a user.
 */
export default class Building {
  constructor(
    public id: number,
    public created_at: string,
    public name: string,
    public address: string,
    public owner_user_id: number,
    public owner?: User
  ) { }

  /**
   * Creates a Building instance from a JSON object.
   */
  static fromJSON(obj: any): Building {
    return new Building(
      obj.id,
      obj.created_at,
      obj.name,
      obj.address,
      obj.owner_user_id,
      obj.owner ? User.fromJSON(obj.owner) : undefined
    );
  }

  /**
   * Serializes the Building instance to JSON.
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      name: this.name,
      address: this.address,
      owner_user_id: this.owner_user_id,
      owner: this.owner?.toJSON()
    };
  }
}
