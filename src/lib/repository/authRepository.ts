import { supabase } from '$lib/supabase';
import type { UserRole, User, Country } from "$lib";

import { customAlphabet } from 'nanoid';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Generate a short pseudo-unique identifier.
 *
 * Format: XXXX-XXXX using uppercase letters and digits.
 * Used for identifying user records in the `user` table.
 *
 * @returns A custom UUID string.
 */
function UUID(): string {
  const nano = customAlphabet(alphabet, 8);
  const raw = nano();
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

/**
 * Authentication Repository
 *
 * Centralized module for handling authentication and user management
 * using Supabase Auth and custom database tables.
 *
 * This repository abstracts:
 * - Email/password sign-in and sign-up
 * - User registration across `user` and `user_profile` tables
 * - Session management (sign out)
 * - Password reset requests and password updates
 * - User metadata updates (email/password)
 */
const authRepository = {
  /**
   * Sign in using email and password.
   *
   * Authenticates the user through Supabase Auth, then retrieves
   * the associated record from the custom `user` table.
   *
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns A result object containing the matched `User` or an error.
   */
  async signIn(email: string, password: string): Promise<{
    data?: User,
    error?: {
      code?: string,
      message?: string
    }
  }> {
    const { data: authData, error: authError } = await supabase
      .auth.signInWithPassword({
        email,
        password
      });

    if (authError || !authData.user) {
      return {
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

  async signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account'
        }
      },
    });

    return { error }
  },

  /**
   * Register a new user.
   *
   * 1. Creates a new Supabase Auth user (email + password).
   * 2. Inserts a corresponding record into the `user` table with role and country.
   * 3. Inserts additional personal data into the `user_profile` table.
   *
   * @param payload - Object containing email, password, personal info, role and country.
   * @returns An object indicating success or a detailed error.
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
    error?: {
      code: string | undefined,
      message: string | undefined
    }
  }> {
    const { data: authData, error: authError } = await supabase
      .auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          emailRedirectTo: `${origin}/auth?action=sign-in`
        }
      });

    if (authError || !authData.user) {
      return {
        error: {
          code: authError?.code,
          message: authError?.message
        }
      };
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
      };
    }

    const { error: profileError } = await supabase
      .from("user_profile")
      .insert({
        first_name: payload.first_name,
        last_name: payload.last_name,
        identity_card: payload.identify_card,
        phone: payload.phone,
        user_id: userData.id
      });

    return {
      error: profileError ? {
        code: profileError?.code,
        message: profileError?.message
      } : undefined
    };
  },

  /**
   * Sign out the currently authenticated user.
   *
   * @returns An object indicating whether sign-out was successful or failed.
   */
  async signOut(): Promise<{
    error?: {
      code?: string,
      message?: string
    }
  }> {
    const { error: authError } = await supabase
      .auth.signOut();

    return {
      error: authError
        ? {
          code: authError?.code,
          message: authError?.message
        }
        : undefined
    };
  },

  /**
   * Request a password reset email.
   *
   * Sends a magic link to the user's email that redirects to the
   * configured `password-reset` page with a `type=recovery` query param.
   *
   * @param email - The email address to send the recovery link to.
   * @returns An object with an optional error.
   */
  async resetPassword(email: string): Promise<{
    error?: {
      code?: string,
      message?: string
    }
  }> {
    const { error: authError } = await supabase
      .auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/password_reset?type=recovery`
      });

    return {
      error: authError
        ? {
          code: authError?.code,
          message: authError?.message
        }
        : undefined
    };
  },

  /**
   * Update the authenticated user's email and/or password.
   *
   * @param attributes - Object containing the new email and/or password.
   * @returns An object with an optional error.
   */
  async updateUser(
    attributes: {
      email?: string,
      password?: string
    }
  ): Promise<{
    error?: {
      code?: string,
      message?: string
    }
  }> {
    const { error: authError } = await supabase
      .auth.updateUser({
        email: attributes?.email,
        password: attributes.password
      });

    return {
      error: authError
        ? {
          code: authError?.code,
          message: authError?.message
        }
        : undefined
    };
  }
};

export default authRepository;