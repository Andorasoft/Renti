import { Country } from "./Country";

/**
 * Represents a state or province in a given country.
 */
export class State {
  /** Unique identifier of the state */
  id: number;

  /** Short name of the state (e.g., "Pichincha") */
  name: string;

  /** Official name (e.g., "Provincia de Pichincha") */
  official_name: string;

  /** ISO or internal code (e.g., "EC-P") */
  code: string;

  /** Type of state (e.g., "Provincia", "Departamento") */
  state_type: string;

  /** Foreign key to the associated country */
  country_id: number;

  /** Full country object (optional) */
  country?: Country;

  /**
   * Creates a new State instance.
   * @param id - State ID
   * @param name - State name
   * @param official_name - Official full name
   * @param code - Code identifier
   * @param state_type - Type of state
   * @param country_id - Country foreign key
   * @param country - Optional country object
   */
  constructor(
    id: number,
    name: string,
    official_name: string,
    code: string,
    state_type: string,
    country_id: number,
    country?: Country
  ) {
    this.id = id;
    this.name = name;
    this.official_name = official_name;
    this.code = code;
    this.state_type = state_type;
    this.country_id = country_id;
    this.country = country;
  }

  /**
   * Parses a JSON object into a State instance.
   * @param json - Raw input JSON
   * @returns State object
   */
  static fromJSON(json: any): State {
    return new State(
      json.id,
      json.name,
      json.official_name,
      json.code,
      json.state_type,
      json.country_id,
      json.country ? Country.fromJSON(json.country) : undefined
    );
  }

  /**
   * Converts the State instance to a JSON object.
   * @returns JSON-compatible object
   */
  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      official_name: this.official_name,
      code: this.code,
      state_type: this.state_type,
      country_id: this.country_id,
      country: this.country?.toJSON(),
    };
  }
}