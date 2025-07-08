import { supabase } from "$lib/supabase";
import Unit from "$lib/models/Unit";

/**
 * Repository object for managing operations on the `unit` table.
 * Each unit represents an individual rental space within a building.
 *
 * Key relationships:
 * - `building_id`: Foreign key referencing the building the unit belongs to.
 * - `tenant_user_id`: Foreign key referencing the `app_user` who currently rents the unit.
 *
 * Additional attributes include size (area), rental amount, floor level,
 * occupancy status, and optional notes for internal management.
 */
const unitRepository = {
  /**
   * Retrieves all unit records, including associated tenant and building data.
   *
   * @returns {Promise<Unit[]>} - A promise that resolves to an array of `Unit`
   * model instances, each including detailed information about its tenant and building.
   *
   * Commonly used for property dashboards, unit availability listings,
   * and lease assignment modules.
   */
  async getAll(): Promise<Unit[]> {
    const { data, error } = await supabase
      .from("unit")
      .select("*, tenant_user:app_user(*), building:building(*)");

    if (error || !data) {
      console.error("Failed to fetch units:", error?.message);
      return [];
    }

    return data.map(Unit.fromJSON);
  },

  /**
   * Retrieves a specific unit by its unique ID, with full metadata.
   *
   * @param {number} id - The unique identifier of the unit to retrieve.
   *
   * @returns {Promise<Unit | null>} - A promise resolving to a `Unit` model
   * with embedded tenant and building data, or `null` if not found.
   *
   * This is used in unit detail views, edit forms, or when validating unit availability
   * and occupancy prior to lease generation or tenant reassignment.
   */
  async getById(id: number): Promise<Unit | null> {
    const { data, error } = await supabase
      .from("unit")
      .select("*, tenant_user:app_user(*), building:building(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`Unit with ID ${id} not found.`, error?.message);
      return null;
    }

    return Unit.fromJSON(data);
  }
};

export default unitRepository;
