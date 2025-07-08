import { supabase } from "$lib/supabase";
import { City } from "$lib/models/City";

/**
 * Repository object for performing operations on the `city` table.
 * This table stores all cities (or equivalent local divisions), each of which
 * belongs to a specific state (via `state_id`).
 *
 * Cities are referenced by buildings and other location-based entities to
 * structure geographic hierarchies in the platform.
 */
const cityRepository = {
  /**
   * Retrieves all cities in the database, including their corresponding state data.
   *
   * @returns {Promise<City[]>} - A promise that resolves to an array of `City`
   * model instances. Each instance includes nested `state` information.
   *
   * This method is commonly used in dynamic dropdowns, forms, and
   * to establish location-based filters or constraints.
   */
  async getAll(): Promise<City[]> {
    const { data, error } = await supabase
      .from("city")
      .select("*, state:state(*)");

    if (error || !data) {
      console.error("Failed to fetch cities:", error?.message);
      return [];
    }

    return data.map(City.fromJSON);
  },

  /**
   * Retrieves a specific city by its unique ID, including the associated state.
   *
   * @param {number} id - The ID of the city to retrieve.
   *
   * @returns {Promise<City | null>} - A promise that resolves to a `City` model instance
   * if found, or `null` if no matching city exists or if the query fails.
   *
   * This method is typically used for viewing or validating location assignments
   * (e.g., when linking a building or lease to a city).
   */
  async getById(id: number): Promise<City | null> {
    const { data, error } = await supabase
      .from("city")
      .select("*, state:state(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`City with ID ${id} not found.`, error?.message);
      return null;
    }

    return City.fromJSON(data);
  }
};

export default cityRepository;
