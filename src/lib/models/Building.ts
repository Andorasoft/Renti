import AppUser from "./AppUser";
import City from "./City";

/**
 * Represents a building that contains rental units.
 */
export default class Building {
  /**
   * Unique identifier of the building.
   */
  public id: number;

  /**
   * Timestamp when the building was created.
   */
  public created_at: string;

  /**
   * Name of the building.
   */
  public name: string;

  /**
   * Physical address of the building.
   */
  public address: string;

  /**
   * Optional description of the building.
   */
  public description: string | null;

  /**
   * Optional location (e.g., coordinates or map URL).
   */
  public location: string | null;

  /**
   * Image URLs or paths associated with the building.
   */
  public images: string[];

  /**
   * Indicates whether the building includes parking.
   */
  public has_parking: boolean;

  /**
   * Optional year when the building was constructed.
   */
  public year_built: number | null;

  /**
   * Whether the building is currently active in the system.
   */
  public is_active: boolean;

  /**
   * Foreign key to the owner user (AppUser).
   */
  public owner_user_id: number;

  /**
   * Foreign key to the city where the building is located.
   */
  public city_id: number;

  /**
   * Optional reference to the city object.
   */
  public city?: City;

  /**
   * Optional reference to the owner user object.
   */
  public owner_user?: AppUser;

  constructor(
    id: number,
    created_at: string,
    name: string,
    address: string,
    description: string | null,
    location: string | null,
    images: string[],
    has_parking: boolean,
    year_built: number | null,
    is_active: boolean,
    owner_user_id: number,
    city_id: number,
    city?: City,
    owner_user?: AppUser
  ) {
    this.id = id;
    this.created_at = created_at;
    this.name = name;
    this.address = address;
    this.description = description;
    this.location = location;
    this.images = images;
    this.has_parking = has_parking;
    this.year_built = year_built;
    this.is_active = is_active;
    this.owner_user_id = owner_user_id;
    this.city_id = city_id;
    this.city = city;
    this.owner_user = owner_user;
  }

  /**
   * Creates a Building instance from a JSON object.
   * @param obj JSON object
   * @returns Building instance
   */
  static fromJSON(obj: any): Building {
    return new Building(
      obj.id,
      obj.created_at,
      obj.name,
      obj.address,
      obj.description ?? null,
      obj.location ?? null,
      obj.images ?? [],
      obj.has_parking,
      obj.year_built ?? null,
      obj.is_active,
      obj.owner_user_id,
      obj.city_id,
      obj.city ? City.fromJSON(obj.city) : undefined,
      obj.owner_user ? AppUser.fromJSON(obj.owner_user) : undefined
    );
  }

  /**
   * Converts the Building instance to a JSON object.
   * @returns JSON representation
   */
  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      name: this.name,
      address: this.address,
      description: this.description,
      location: this.location,
      images: this.images,
      has_parking: this.has_parking,
      year_built: this.year_built,
      is_active: this.is_active,
      owner_user_id: this.owner_user_id,
      city_id: this.city_id,
      city: this.city,
      owner_user: this.owner_user
    };
  }
}
