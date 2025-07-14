import { City } from "./City";
import { User } from "./User";

/**
 * Represents a building registered in the platform.
 */
export class Building {
  /** Unique identifier */
  id: number;

  /** Name of the building */
  name: string;

  /** Full address */
  address: string;

  /** Optional description */
  description?: string;

  /** Optional map location (e.g., GPS or link) */
  location?: string;

  /** Array of image URLs */
  image_urls: string[];

  /** Whether the building has parking */
  has_parking: boolean;

  /** Optional year built */
  year_built?: number;

  /** Whether the building is active */
  is_active: boolean;

  /** Foreign key to the owner user */
  owner_user_id: number;

  /** Full owner user object (optional) */
  owner_user?: User;

  /** Foreign key to the city */
  city_id: number;

  /** Full city object (optional) */
  city?: City;

  /**
   * Creates a new Building instance.
   */
  constructor(
    id: number,
    name: string,
    address: string,
    description: string | undefined,
    location: string | undefined,
    image_urls: string[],
    has_parking: boolean,
    year_built: number | undefined,
    is_active: boolean,
    owner_user_id: number,
    owner_user: User | undefined,
    city_id: number,
    city: City | undefined
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.description = description;
    this.location = location;
    this.image_urls = image_urls;
    this.has_parking = has_parking;
    this.year_built = year_built;
    this.is_active = is_active;
    this.owner_user_id = owner_user_id;
    this.owner_user = owner_user;
    this.city_id = city_id;
    this.city = city;
  }

  /**
   * Parses a JSON object into a Building.
   */
  static fromJSON(json: any): Building {
    return new Building(
      json.id,
      json.name,
      json.address,
      json.description,
      json.location,
      json.image_urls || [],
      json.has_parking,
      json.year_built,
      json.is_active,
      json.owner_user_id,
      json.owner_user ? User.fromJSON(json.owner_user) : undefined,
      json.city_id,
      json.city ? City.fromJSON(json.city) : undefined
    );
  }

  /** Converts the building to a JSON-compatible object */
  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      description: this.description,
      location: this.location,
      image_urls: this.image_urls,
      has_parking: this.has_parking,
      year_built: this.year_built,
      is_active: this.is_active,
      owner_user_id: this.owner_user_id,
      owner_user: this.owner_user?.toJSON(),
      city_id: this.city_id,
      city: this.city?.toJSON(),
    };
  }
}