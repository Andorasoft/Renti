import { supabase } from "$lib/supabase";
import { Building } from "$lib/models/Building";

/**
 * Repository object for handling database operations related to the `building` table.
 * Each building record includes structural, geographic, and ownership information.
 *
 * Key relationships:
 * - `owner_user_id`: References an `app_user` who owns the building.
 * - `city_id`: Links the building to a specific `city`.
 *
 * Additional fields describe the building itself (e.g., parking availability,
 * year built, location, and image gallery).
 */
const buildingRepository = {
  /**
   * Retrieves all building records from the database, including owner and city metadata.
   *
   * @returns {Promise<Building[]>} - A promise that resolves to an array of `Building`
   * model instances. Each instance includes nested `app_user` (owner) and `city` information.
   *
   * This method is typically used to render building listings, property dashboards,
   * or provide building context for tenant assignment or lease management.
   */
  async getAll(): Promise<Building[]> {
    const { data, error } = await supabase
      .from("building")
      .select("*, city:city(*), owner_user:app_user(*)");

    if (error || !data) {
      console.error("Failed to fetch buildings:", error?.message);
      return [];
    }

    return data.map(Building.fromJSON);
  },

  /**
   * Retrieves a specific building record by its unique ID.
   *
   * @param {number} id - The ID of the building to fetch.
   *
   * @returns {Promise<Building | null>} - A promise that resolves to a `Building` model
   * instance with owner and city info if found, or `null` otherwise.
   *
   * Commonly used when editing a building, assigning a unit to it, or validating
   * ownership in access control logic.
   */
  async getById(id: number): Promise<Building | null> {
    const { data, error } = await supabase
      .from("building")
      .select("*, city:city(*), owner_user:app_user(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`Building with ID ${id} not found.`, error?.message);
      return null;
    }

    return Building.fromJSON(data);
  }
};

export default buildingRepository;
