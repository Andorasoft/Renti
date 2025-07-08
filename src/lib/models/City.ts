import State from './State';

/**
 * Represents a city within a state or province.
 */
export default class City {
  /**
   * Unique identifier of the city.
   */
  public id: number;

  /**
   * Timestamp when the city was created.
   */
  public created_at: string;

  /**
   * Name of the city.
   */
  public name: string;

  /**
   * Foreign key to the state the city belongs to.
   */
  public state_id: number;

  /**
   * Optional reference to the state object.
   */
  public state?: State;

  constructor(
    id: number,
    created_at: string,
    name: string,
    state_id: number,
    state?: State
  ) {
    this.id = id;
    this.created_at = created_at;
    this.name = name;
    this.state_id = state_id;
    this.state = state;
  }

  /**
   * Creates a new instance of City from a plain JSON object.
   * @param obj JSON object
   * @returns City instance
   */
  static fromJSON(obj: any): City {
    return new City(
      obj.id,
      obj.created_at,
      obj.name,
      obj.state_id,
      obj.state ? State.fromJSON(obj.state) : undefined
    );
  }

  /**
   * Converts the City instance into a JSON object.
   * @returns JSON object representation
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      name: this.name,
      state_id: this.state_id,
      state: this.state
    };
  }
}
