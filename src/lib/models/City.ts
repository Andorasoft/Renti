import { State } from "./State";

/**
 * Represents a city within a state or province.
 */
export class City {
  /** Unique identifier of the city */
  id: number;

  /** Name of the city (e.g., "Quito") */
  name: string;

  /** Foreign key to the parent state */
  state_id: number;

  /** Full state object (optional) */
  state?: State;

  /**
   * Creates a new City instance.
   * @param id - City ID
   * @param name - City name
   * @param state_id - Foreign key to state
   * @param state - Optional State object
   */
  constructor(id: number, name: string, state_id: number, state?: State) {
    this.id = id;
    this.name = name;
    this.state_id = state_id;
    this.state = state;
  }

  /**
   * Parses a JSON object into a City instance.
   * @param json - Input JSON
   * @returns City instance
   */
  static fromJSON(json: any): City {
    return new City(
      json.id,
      json.name,
      json.state_id,
      json.state ? State.fromJSON(json.state) : undefined
    );
  }

  /**
   * Converts the City instance to JSON.
   * @returns JSON-compatible object
   */
  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      state_id: this.state_id,
      state: this.state?.toJSON(),
    };
  }
}