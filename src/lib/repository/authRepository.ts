import type { AuthError, AuthUser } from '@supabase/supabase-js';
import { supabase } from '$lib/supabase';

/**
 * Authentication Repository
 *
 * Centralized abstraction layer for authentication using Supabase Auth.
 * Encapsulates user sign-in, sign-up, session management, recovery,
 * and metadata updates. Also designed to be extendable for integration
 * with custom database tables like `user` or `user_profile`.
 */
const authRepository = {
  /**
   * Retrieves the current authenticated user from Supabase.
   *
   * @returns An object containing the current `AuthUser` or an `AuthError`.
   */
  async getUser(): Promise<{
    data: AuthUser | null;
    error: AuthError | null;
  }> {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    return {
      data: authData?.user ?? null,
      error: authError,
    };
  },

  /**
   * Authenticates a user via email and password.
   *
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns An object containing the authenticated `AuthUser` or an `AuthError`.
   */
  async signIn(email: string, password: string): Promise<{
    data: AuthUser | null;
    error: AuthError | null;
  }> {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      data: authData?.user ?? null,
      error: authError,
    };
  },

  /**
   * Initiates OAuth login with Google provider.
   *
   * @returns An object containing an optional `AuthError`.
   */
  async signInWithGoogle(): Promise<{
    error: AuthError | null;
  }> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account', // always show Google account selector
        },
      },
    });

    return { error };
  },

  /**
   * Registers a new user using email and password.
   *
   * If phone is provided, it is stored but not verified (unless SMS auth is enabled).
   * The email verification link will redirect to the provided `emailRedirectTo` URL.
   *
   * @param attributes - User registration payload.
   * @param attributes.email - The user's email address.
   * @param attributes.password - The user's password.
   * @param attributes.phone - (Optional) Phone number in E.164 format.
   * @returns An object containing an optional `AuthError`.
   */
  async signUp(attributes: {
    email: string;
    password: string;
    phone?: string;
  }): Promise<{
    error: AuthError | null;
  }> {
    const { error: authError } = await supabase.auth.signUp({
      email: attributes.email,
      password: attributes.password,
      phone: attributes.phone ?? '',
      options: {
        emailRedirectTo: `${origin}/auth?action=sign-in`,
      },
    });

    return { error: authError };
  },

  /**
   * Signs out the currently authenticated user.
   *
   * @returns An object indicating if sign-out was successful or failed.
   */
  async signOut(): Promise<{
    error: AuthError | null;
  }> {
    const { error: authError } = await supabase.auth.signOut();

    return { error: authError };
  },

  /**
   * Sends a password recovery email to the given address.
   *
   * The recovery email will redirect to the configured reset URL
   * with `?type=recovery` appended to the query string.
   *
   * @param email - The email address to send the recovery link to.
   * @returns An object containing an optional `AuthError`.
   */
  async resetPassword(email: string): Promise<{
    error: AuthError | null;
  }> {
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/password_reset?type=recovery`,
    });

    return { error: authError };
  },

  /**
   * Updates the current authenticated user's email and/or password.
   *
   * @param attributes - Fields to update.
   * @param attributes.email - (Optional) New email address.
   * @param attributes.password - (Optional) New password.
   * @returns An object containing an optional `AuthError`.
   */
  async updateUser(attributes: {
    email?: string;
    password?: string;
  }): Promise<{
    error: AuthError | null;
  }> {
    const { error: authError } = await supabase.auth.updateUser({
      email: attributes.email,
      password: attributes.password,
    });

    return { error: authError };
  },
};

export default authRepository;