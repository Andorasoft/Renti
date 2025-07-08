import { supabase } from "$lib/supabase";
import StateType from "$lib/models/StateType";

/**
 * Repository object for performing data access operations on the `state_type` table.
 * This table defines the types or classifications of sub-national political divisions,
 * such as "province", "state", "region", or "department", depending on the country.
 *
 * These records are referenced by the `state` table to categorize each state accordingly.
 */
const stateTypeRepository = {
  /**
   * Retrieves all records from the `state_type` table.
   *
   * @returns {Promise<StateType[]>} - A promise that resolves to an array of `StateType`
   * model instances, each representing a valid classification of administrative region.
   *
   * If the query encounters an error or returns no data, an empty array is returned instead.
   * This method is useful for rendering UI selection options or validating input forms.
   */
  async getAll(): Promise<StateType[]> {
    const { data, error } = await supabase
      .from("state_type")
      .select("*");

    if (error || !data) {
      console.error("Failed to fetch state types:", error?.message);
      return [];
    }

    return data.map(StateType.fromJSON);
  },

  /**
   * Retrieves a specific state type by its primary key.
   *
   * @param {number} id - The unique identifier of the state type to be fetched.
   *
   * @returns {Promise<StateType | null>} - A promise that resolves to a `StateType`
   * instance if found, or `null` if no matching record exists or if the query fails.
   *
   * This is often used when displaying full region details or verifying foreign key constraints.
   */
  async getById(id: number): Promise<StateType | null> {
    const { data, error } = await supabase
      .from("state_type")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`State type with ID ${id} not found.`, error?.message);
      return null;
    }

    return StateType.fromJSON(data);
  }
};

export default stateTypeRepository;
