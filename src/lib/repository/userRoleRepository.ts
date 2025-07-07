import { UserRole } from "$lib/models";
import { supabase } from "$lib";

/**
 * UserRole Repository
 *
 * Provides data access methods for the "user_role" table,
 * used to manage roles within the system (e.g., Owner, Tenant, Admin).
 */
const userRoleRepository = {
  /**
   * Fetch all user roles from the database.
   *
   * @returns An array of `UserRole` instances. Returns an empty array if an error occurs.
   */
  async getAll(): Promise<Array<UserRole>> {
    const { data, error } = await supabase
      .from("user_role")
      .select("*");

    return error ? [] : data.map(UserRole.fromJSON);
  },

  /**
   * Fetch a user role by its unique numeric ID.
   *
   * @param id - The ID of the role.
   * @returns A `UserRole` instance if found, otherwise `null`.
   */
  async getById(id: number): Promise<UserRole | null> {
    const { data, error } = await supabase
      .from("user_role")
      .select("*")
      .eq("id", id)
      .single();

    return error ? null : UserRole.fromJSON(data);
  },

  /**
   * Fetch a user role by its unique name.
   *
   * @param name - The name of the role (e.g., "owner", "tenant").
   * @returns A `UserRole` instance if found, otherwise `null`.
   */
  async getByName(name: string): Promise<UserRole | null> {
    const { data, error } = await supabase
      .from("user_role")
      .select("*")
      .eq("name", name)
      .single();

    return error ? null : UserRole.fromJSON(data);
  }
};

export default userRoleRepository;