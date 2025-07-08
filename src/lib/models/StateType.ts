/**
 * Represents the type of a state (e.g., province, department).
 */
export default class StateType {
  /**
   * Unique identifier of the state type.
   */
  public id: number;

  /**
   * Timestamp when the state type was created.
   */
  public created_at: string;

  /**
   * Name of the state type (e.g., Province, State, Department).
   */
  public name: string;

  constructor(
    id: number,
    created_at: string,
    name: string
  ) {
    this.id = id;
    this.created_at = created_at;
    this.name = name;
  }

  /**
   * Creates a new instance of StateType from a plain JSON object.
   * @param obj JSON object
   * @returns StateType instance
   */
  static fromJSON(obj: any): StateType {
    return new StateType(
      obj.id,
      obj.created_at,
      obj.name
    );
  }

  /**
   * Converts the StateType instance into a JSON object.
   * @returns JSON object representation
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      name: this.name
    };
  }
}
