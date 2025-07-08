import { supabase } from "$lib/supabase";
import { State } from "$lib/models/State";

/**
 * Repository object for accessing data in the `state` table.
 * This table stores administrative subdivisions of countries such as
 * provinces, states, departments, or regions.
 *
 * Each record is associated with:
 * - A `state_type` (e.g., Province, Region, etc.)
 * - A `country` that the state belongs to
 *
 * The `state` table is referenced by the `city` table to further localize entities.
 */
const stateRepository = {
  /**
   * Fetches all states from the database, including related `state_type` and `country` data.
   *
   * @returns {Promise<State[]>} - A promise that resolves to an array of `State` model
   * instances, each enriched with its classification and country.
   *
   * This is typically used to populate location pickers, set up hierarchical filters,
   * or pre-fill address fields in a form.
   */
  async getAll(): Promise<State[]> {
    const { data, error } = await supabase
      .from("state")
      .select("*, state_type:state_type(*), country:country(*)");

    if (error || !data) {
      console.error("Failed to fetch states:", error?.message);
      return [];
    }

    return data.map(State.fromJSON);
  },

  /**
   * Fetches a specific state by its unique ID, including full metadata.
   *
   * @param {number} id - The unique identifier of the state to retrieve.
   *
   * @returns {Promise<State | null>} - A promise that resolves to a `State` model
   * if found, or `null` if the state does not exist or if the query fails.
   *
   * Useful when displaying full geographic information or validating nested relationships
   * (e.g., determining if a city belongs to the correct state and country).
   */
  async getById(id: number): Promise<State | null> {
    const { data, error } = await supabase
      .from("state")
      .select("*, state_type:state_type(*), country:country(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`State with ID ${id} not found.`, error?.message);
      return null;
    }

    return State.fromJSON(data);
  }
};

export default stateRepository;
