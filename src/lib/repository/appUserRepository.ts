import { supabase } from "$lib/supabase";
import AppUser from "$lib/models/AppUser";

/**
 * Repository object for interacting with the `app_user` table.
 * This table stores all user records, including both property owners and tenants.
 * Each user is linked to a role (via `user_role_id`) and a country (via `country_id`).
 *
 * Additional fields such as `uuid`, `identity_card`, `phone`, `email`, and `image`
 * are used for identification, authentication, and user profile display.
 */
const appUserRepository = {
  /**
   * Retrieves all user records from the `app_user` table.
   *
   * The query also fetches related role and country data using foreign key joins.
   *
   * @returns {Promise<AppUser[]>} - A promise that resolves to an array of `AppUser`
   * model instances. Each user includes its corresponding `user_role` and `country`.
   *
   * This method is used to render user lists, administration panels, or export data
   * with complete role and location context.
   */
  async getAll(): Promise<AppUser[]> {
    const { data, error } = await supabase
      .from("app_user")
      .select("*, user_role:user_role(*), country:country(*)");

    if (error || !data) {
      console.error("Failed to fetch app users:", error?.message);
      return [];
    }

    return data.map(AppUser.fromJSON);
  },

  /**
   * Retrieves a single user record by its unique numeric ID.
   *
   * The returned object includes joined data for the user’s role and country.
   *
   * @param {number} id - The unique identifier of the user to fetch.
   *
   * @returns {Promise<AppUser | null>} - A promise resolving to a single `AppUser`
   * model if found, or `null` if not found or if an error occurs.
   *
   * This is used in contexts like profile views, edit forms, and role-based checks.
   */
  async getById(id: number): Promise<AppUser | null> {
    const { data, error } = await supabase
      .from("app_user")
      .select("*, user_role:user_role(*), country:country(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`App user with ID ${id} not found.`, error?.message);
      return null;
    }

    return AppUser.fromJSON(data);
  },

  /**
 * Retrieves a user from the `app_user` table by their email address.
 *
 * This method is typically used in authentication flows, password recovery,
 * and to validate the uniqueness of user emails during registration.
 *
 * The query includes related data from `user_role` and `country` tables.
 *
 * @param {string} email - The email address of the user to fetch.
 *
 * @returns {Promise<AppUser | null>} - A promise resolving to an `AppUser` instance
 * if a matching user is found, or `null` if not found or if the query fails.
 */
  async getByEmail(email: string): Promise<AppUser | null> {
    const { data, error } = await supabase
      .from("app_user")
      .select("*, user_role:user_role(*), country:country(*)")
      .eq("email", email)
      .single();

    if (error || !data) {
      console.warn(`No user found with email ${email}:`, error?.message);
      return null;
    }

    return AppUser.fromJSON(data);
  },

  /**
 * Inserts a new user record into the `app_user` table.
 *
 * Accepts a plain object with user properties such as name, email, role and country.
 * This method handles the serialization and formatting required by Supabase,
 * and returns a fully populated `AppUser` instance with resolved role and country.
 *
 * @param {object} input - Plain object containing required fields for user creation.
 * Example fields: `uuid`, `first_name`, `last_name`, `email`, `user_role_id`, `country_id`, etc.
 *
 * @returns {Promise<AppUser | null>} - A promise that resolves to an instance of `AppUser`
 * if the insertion succeeds, or `null` if there is a validation or database error.
 *
 * This method is used in user registration flows or administrative user onboarding.
 */
  async create(input: {
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    user_role_id: number;
    country_id: number;
    identity_card?: string;
    phone?: string;
    image?: string;
  }): Promise<AppUser | null> {
    const { data, error } = await supabase
      .from("app_user")
      .insert(input)
      .select("*, user_role:user_role(*), country:country(*)")
      .single();

    if (error || !data) {
      console.error("Failed to insert app user:", error?.message);
      return null;
    }

    return AppUser.fromJSON(data);
  },

  /**
 * Updates an existing user record in the `app_user` table.
 *
 * Only the fields present in the `updates` object will be modified.
 *
 * @param {number} id - The unique ID of the user to update.
 * @param {Partial<AppUser>} updates - An object containing the fields to update.
 * Should use `AppUser.toUpdateJSON()` to sanitize input if needed.
 *
 * @returns {Promise<AppUser | null>} - A promise resolving to the updated user
 * as an `AppUser` model instance if the update is successful, or `null` otherwise.
 *
 * This method is commonly used in profile editors, administrative user management,
 * or syncing identity and contact information.
 */
  async update(id: number, updates: Partial<AppUser>): Promise<AppUser | null> {
    const { data, error } = await supabase
      .from("app_user")
      .update(updates)
      .eq("id", id)
      .select("*, user_role:user_role(*), country:country(*)")
      .single();

    if (error || !data) {
      console.error(`Failed to update user with ID ${id}:`, error?.message);
      return null;
    }

    return AppUser.fromJSON(data);
  }
};

export default appUserRepository;
