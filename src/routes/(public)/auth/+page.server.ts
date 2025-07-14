import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

/**
 * Handles login and signup actions using SvelteKit form actions.
 */
export const actions: Actions = {
  /**
   * Authenticates a user by email and password.
   *
   * @param request - The incoming form request.
   * @returns Redirects to home or returns error message.
   */
  signin: async ({ locals, request }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString().trim() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return fail(400, { message: 'Debes ingresar un correo electrónico válido.' });
    }

    if (!password || password.length < 8) {
      return fail(400, { message: 'La contraseña debe tener al menos 8 caracteres.' });
    }

    const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return fail(400, {
        message:
          error.message === 'Email not confirmed'
            ? 'Debes confirmar tu correo electrónico antes de iniciar sesión.'
            : 'Credenciales incorrectas. Verifica tu correo y contraseña.'
      });
    }

    throw redirect(303, '/');
  },

  /**
   * Registers a new user using email and password.
   *
   * @param request - The incoming form request.
   * @returns Redirects to signin or returns validation error.
   */
  signup: async ({ locals, request, url }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString().trim() ?? '';
    const password = formData.get('password')?.toString() ?? '';
    const confirmPassword = formData.get('confirm_password')?.toString() ?? '';

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return fail(400, { message: 'Debes ingresar un correo electrónico válido.' });
    }

    if (!password || password.length < 8) {
      return fail(400, { message: 'La contraseña debe tener al menos 8 caracteres.' });
    }

    if (password !== confirmPassword) {
      return fail(400, { message: 'Las contraseñas no coinciden.' });
    }

    const { error } = await locals.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback?type=signup`
      }
    });

    if (error) {
      return fail(400, {
        message: error.message ?? 'Error al registrar. Intenta con otro correo.'
      });
    }

    throw redirect(303, '/auth?action=signin');
  }
};