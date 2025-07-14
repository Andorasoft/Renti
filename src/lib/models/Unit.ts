import { Building } from "./Building";

/**
 * Represents a unit inside a building available for rent.
 */
export class Unit {
  /** Unique identifier of the unit */
  id: number;

  /** Name or identifier of the unit (e.g., "101-A") */
  name: string;

  /** Floor number where the unit is located */
  floor: number;

  /** Area in square meters (optional) */
  area_m2?: number;

  /** Rent amount for the unit */
  rent: number;

  /** Whether the unit is currently occupied */
  is_occupied: boolean;

  /** Optional notes about the unit */
  notes?: string;

  /** Foreign key to the building */
  building_id: number;

  /** Full building object (optional) */
  building?: Building;

  /**
   * Creates a new Unit instance.
   * @param id - Unit ID
   * @param name - Unit name
   * @param floor - Floor number
   * @param area_m2 - Optional area in m2
   * @param rent - Rent value
   * @param is_occupied - Whether occupied
   * @param notes - Optional notes
   * @param building_id - Building foreign key
   * @param building - Optional building object
   */
  constructor(
    id: number,
    name: string,
    floor: number,
    area_m2: number | undefined,
    rent: number,
    is_occupied: boolean,
    notes: string | undefined,
    building_id: number,
    building?: Building
  ) {
    this.id = id;
    this.name = name;
    this.floor = floor;
    this.area_m2 = area_m2;
    this.rent = rent;
    this.is_occupied = is_occupied;
    this.notes = notes;
    this.building_id = building_id;
    this.building = building;
  }

  /**
   * Parses a JSON object into a Unit instance.
   * @param json - Input data
   * @returns Unit instance
   */
  static fromJSON(json: any): Unit {
    return new Unit(
      json.id,
      json.name,
      json.floor,
      json.area_m2,
      json.rent,
      json.is_occupied,
      json.notes,
      json.building_id,
      json.building ? Building.fromJSON(json.building) : undefined
    );
  }

  /**
   * Converts the Unit to JSON.
   * @returns JSON-compatible object
   */
  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      floor: this.floor,
      area_m2: this.area_m2,
      rent: this.rent,
      is_occupied: this.is_occupied,
      notes: this.notes,
      building_id: this.building_id,
      building: this.building?.toJSON(),
    };
  }
}