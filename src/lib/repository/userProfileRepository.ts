import { UserProfile, type User } from "$lib/models";
import { supabase } from "$lib";

/**
 * UserProfile Repository
 *
 * Provides methods to access and manage data from the `user_profile` table.
 * This table stores detailed profile information associated with each user.
 */
const userProfileRepository = {
  /**
   * Retrieve all user profiles from the database.
   *
   * @returns An array of `UserProfile` instances. Returns an empty array if an error occurs.
   */
  async getAll(): Promise<Array<UserProfile>> {
    const { data, error } = await supabase
      .from("user_profile")
      .select("*");

    return error ? [] : data.map(UserProfile.fromJSON);
  },

  /**
   * Retrieve a user profile by its primary key ID.
   *
   * @param id - The ID of the profile to retrieve.
   * @returns A `UserProfile` instance if found, otherwise `null`.
   */
  async getById(id: number): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from("user_profile")
      .select("*")
      .eq("id", id)
      .single();

    return error ? null : UserProfile.fromJSON(data);
  },

  /**
   * Retrieve the profile associated with a given user.
   *
   * @param user - The `User` object containing at least an `id` field.
   * @returns A `UserProfile` instance if found, otherwise `null`.
   */
  async getByUser(user: User): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from("user_profile")
      .select("*")
      .eq("user_id", user.id)
      .single();

    return error ? null : UserProfile.fromJSON(data);
  },

  /**
   * Insert a new user profile linked to an existing user.
   *
   * @param profile - An object containing profile data (`first_name`, `last_name`, and optionally `identity_card`, `phone`).
   * @param user - The user to associate the profile with (must have valid `id`).
   * @returns The inserted `UserProfile` instance if successful, otherwise `null`.
   */
  async insert(
    profile: {
      first_name: string,
      last_name: string,
      identity_card?: string,
      phone?: string
    },
    user: User
  ): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from("user_profile")
      .insert({
        ...profile,
        user_id: user.id
      })
      .select("*")
      .single();

    return error ? null : UserProfile.fromJSON(data);
  },

  /**
   * Update an existing user profile by ID.
   *
   * @param id - The ID of the profile to update.
   * @param profile - An object with updated profile fields (`first_name`, `last_name`, etc.).
   * @returns The updated `UserProfile` instance if successful, otherwise `null`.
   */
  async update(
    id: number,
    profile: {
      first_name: string,
      last_name: string,
      identity_card?: string,
      phone?: string
    }
  ): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from("user_profile")
      .update({
        ...profile
      })
      .eq("id", id)
      .select("*")
      .single();

    return error ? null : UserProfile.fromJSON(data);
  }
};

export default userProfileRepository;