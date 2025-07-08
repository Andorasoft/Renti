import { supabase } from "$lib/supabase";
import { UserRole } from "$lib/models/UserRole";

/**
 * Repository object for handling operations related to the `user_role` table.
 * This table stores the different roles a user can have in the application,
 * such as "owner", "tenant", or "administrator". These roles define access
 * permissions and functional scope for each user in the system.
 */
const userRoleRepository = {
  /**
   * Retrieves all user role records from the `user_role` table.
   *
   * @returns {Promise<UserRole[]>} - A promise that resolves to an array of
   * `UserRole` model instances representing all user roles in the database.
   *
   * If the query fails or returns no data, an empty array is returned instead.
   * This is commonly used when populating role dropdowns or validating user input.
   */
  async getAll(): Promise<UserRole[]> {
    const { data, error } = await supabase
      .from("user_role")
      .select("*");

    if (error || !data) {
      console.error("Failed to fetch user roles:", error?.message);
      return [];
    }

    return data.map(UserRole.fromJSON);
  },

  /**
   * Retrieves a specific user role by its unique numeric identifier.
   *
   * @param {number} id - The unique ID of the user role to retrieve.
   *
   * @returns {Promise<UserRole | null>} - A promise that resolves to the `UserRole`
   * instance if found, or `null` if the role does not exist or if an error occurs.
   *
   * Useful for editing roles, displaying user role names based on ID, or validating assignments.
   */
  async getById(id: number): Promise<UserRole | null> {
    const { data, error } = await supabase
      .from("user_role")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`User role with ID ${id} not found.`, error?.message);
      return null;
    }

    return UserRole.fromJSON(data);
  }
};

export default userRoleRepository;
