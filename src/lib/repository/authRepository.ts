import { supabase } from '$lib/supabase';
import type { UserRole, User, Country } from "$lib";

import { customAlphabet } from 'nanoid';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Generate a pseudo-unique ID using the custom alphabet.
 * Format: XXXX-XXXX (uppercase letters and digits)
 *
 * @returns A string UUID in custom format.
 */
function UUID(): string {
  const nano = customAlphabet(alphabet, 8);
  const raw = nano();
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

/**
 * Authentication Repository
 *
 * Handles user authentication and registration workflows
 * using Supabase Auth and custom user tables.
 *
 * This repository links Supabase's auth.user with the custom "user" and "user_profile" tables.
 */
const authRepository = {
  /**
   * Sign in a user using email and password.
   *
   * This method authenticates the user with Supabase Auth
   * and retrieves the corresponding record from the custom "user" table.
   *
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns An object with `success` and the corresponding `user` if found.
   */
  async signIn(email: string, password: string): Promise<{
    data: User | null,
    error: {
      code: string | undefined,
      message: string | undefined
    } | undefined
  }> {
    const { data: authData, error: authError } = await supabase
      .auth.signInWithPassword({
        email,
        password
      });

    if (authError || !authData.user) {
      return {
        data: null,
        error: {
          code: authError?.code,
          message: authError?.message
        }
      };
    }

    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("*")
      .eq("email", authData.user.email)
      .single();

    return {
      data: userData ?? null,
      error: userError ? {
        code: userError?.code,
        message: userError?.message
      } : undefined
    };
  },

  /**
   * Sign up a new user by creating:
   * 1. Supabase Auth user
   * 2. A record in the custom "user" table
   * 3. A record in the "user_profile" table
   *
   * @param email - The new user's email.
   * @param password - The new user's password.
   * @param role - Role to assign (must include valid `id`).
   * @param profile - Profile data to insert into `user_profile`.
   * @param country - Country to assign (must include valid `id`).
   * @returns True if all steps succeed; false otherwise.
   */
  async signUp(payload: {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    identify_card?: string,
    phone?: string,
    role: UserRole,
    country: Country
  },
  ): Promise<{
    error: {
      code: string | undefined,
      message: string | undefined
    }
  } | undefined> {
    const { data: authData, error: authError } = await supabase
      .auth.signUp({
        email: payload.email,
        password: payload.password
      });

    if (authError || !authData.user) {
      return {
        error: {
          code: authError?.code,
          message: authError?.message
        }
      }
    }

    const uuid = UUID();
    const { data: userData, error: userError } = await supabase
      .from("user")
      .insert({
        uuid,
        email: payload.email,
        user_role_id: payload.role.id,
        country_id: payload.country.id
      })
      .select("*")
      .single();

    if (userError || !userData) {
      return {
        error: {
          code: userError?.code,
          message: userError?.message
        }
      }
    };

    const { error: profileError } = await supabase
      .from("user_profile")
      .insert({
        first_name: payload.first_name,
        last_name: payload.last_name,
        identity_card: payload.identify_card,
        phone: payload.phone,
        user_id: userData.id
      });

    return profileError
      ? {
        error: {
          code: profileError?.code,
          message: profileError?.message
        }
      }
      : undefined;
  },

  /**
   * Sign out the current authenticated user.
   *
   * @returns True if successful; false if an error occurs.
   */
  async signOut(): Promise<{
    error: {
      code: string | undefined,
      message: string | undefined
    }
  } | undefined> {
    const { error: authError } = await supabase
      .auth.signOut();

    return authError
      ? {
        error: {
          code: authError?.code,
          message: authError?.message
        }
      }
      : undefined;
  },

  /**
   * Request a password reset email for the given email.
   *
   * @param email - The user's email.
   * @returns True if the email was sent successfully.
   */
  async resetPassword(email: string): Promise<boolean> {
    const { error } = await supabase
      .auth.resetPasswordForEmail(email);

    return !error;
  }
};

export default authRepository;