import Building from "./Building";
import AppUser from "./AppUser";

/**
 * Represents a rental unit within a building.
 */
export default class Unit {
  /**
   * Unique identifier of the unit.
   */
  public id: number;

  /**
   * Timestamp when the unit was created.
   */
  public created_at: string;

  /**
   * Name or identifier of the unit.
   */
  public name: string;

  /**
   * Floor number where the unit is located.
   */
  public floor: number;

  /**
   * Surface area in square meters. Optional.
   */
  public area_m2: number | null;

  /**
   * Monthly rent value.
   */
  public rent: number;

  /**
   * Whether the unit is currently occupied.
   */
  public is_occupied: boolean;

  /**
   * Optional notes about the unit.
   */
  public notes: string | null;

  /**
   * Foreign key to the tenant (AppUser).
   */
  public tenant_user_id: number;

  /**
   * Foreign key to the building.
   */
  public building_id: number;

  /**
   * Optional reference to the tenant user object.
   */
  public tenant_user?: AppUser;

  /**
   * Optional reference to the building object.
   */
  public building?: Building;

  constructor(
    id: number,
    created_at: string,
    name: string,
    floor: number,
    area_m2: number | null,
    rent: number,
    is_occupied: boolean,
    notes: string | null,
    tenant_user_id: number,
    building_id: number,
    tenant_user?: AppUser,
    building?: Building
  ) {
    this.id = id;
    this.created_at = created_at;
    this.name = name;
    this.floor = floor;
    this.area_m2 = area_m2;
    this.rent = rent;
    this.is_occupied = is_occupied;
    this.notes = notes;
    this.tenant_user_id = tenant_user_id;
    this.building_id = building_id;
    this.tenant_user = tenant_user;
    this.building = building;
  }

  /**
   * Creates a Unit instance from a JSON object.
   * @param obj JSON object
   * @returns Unit instance
   */
  static fromJSON(obj: any): Unit {
    return new Unit(
      obj.id,
      obj.created_at,
      obj.name,
      obj.floor,
      obj.area_m2 ?? null,
      Number(obj.rent),
      obj.is_occupied,
      obj.notes ?? null,
      obj.tenant_user_id,
      obj.building_id,
      obj.tenant_user ? AppUser.fromJSON(obj.tenant_user) : undefined,
      obj.building ? Building.fromJSON(obj.building) : undefined
    );
  }

  /**
   * Converts the Unit instance to a JSON object.
   * @returns JSON representation
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      name: this.name,
      floor: this.floor,
      area_m2: this.area_m2,
      rent: this.rent,
      is_occupied: this.is_occupied,
      notes: this.notes,
      tenant_user_id: this.tenant_user_id,
      building_id: this.building_id,
      tenant_user: this.tenant_user,
      building: this.building
    };
  }
}
