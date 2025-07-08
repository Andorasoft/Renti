import Country from './Country';
import StateType from './StateType';

/**
 * Represents a state or province within a country.
 */
export default class State {
  /**
   * Unique identifier of the state.
   */
  public id: number;

  /**
   * Timestamp when the state was created.
   */
  public created_at: string;

  /**
   * Name of the state or province.
   */
  public name: string;

  /**
   * Official name of the state (e.g., "Estado de México").
   */
  public official_name: string;

  /**
   * Short code identifier (e.g., MX-MEX).
   */
  public code: string;

  /**
   * Foreign key to the state type.
   */
  public state_type_id: number;

  /**
   * Foreign key to the country.
   */
  public country_id: number;

  /**
   * Optional reference to the country object.
   */
  public country?: Country;

  /**
   * Optional reference to the state type object.
   */
  public state_type?: StateType;

  constructor(
    id: number,
    created_at: string,
    name: string,
    official_name: string,
    code: string,
    state_type_id: number,
    country_id: number,
    country?: Country,
    state_type?: StateType
  ) {
    this.id = id;
    this.created_at = created_at;
    this.name = name;
    this.official_name = official_name;
    this.code = code;
    this.state_type_id = state_type_id;
    this.country_id = country_id;
    this.country = country;
    this.state_type = state_type;
  }

  /**
   * Creates a new instance of State from a plain JSON object.
   * @param obj JSON object
   * @returns State instance
   */
  static fromJSON(obj: any): State {
    return new State(
      obj.id,
      obj.created_at,
      obj.name,
      obj.official_name,
      obj.code,
      obj.state_type_id,
      obj.country_id,
      obj.country ? Country.fromJSON(obj.country) : undefined,
      obj.state_type ? StateType.fromJSON(obj.state_type) : undefined
    );
  }

  /**
   * Converts the State instance into a JSON object.
   * @returns JSON object representation
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      name: this.name,
      official_name: this.official_name,
      code: this.code,
      state_type: this.state_type_id,
      country_id: this.country_id,
      country: this.country,
      stateTypeObj: this.state_type
    };
  }
}
