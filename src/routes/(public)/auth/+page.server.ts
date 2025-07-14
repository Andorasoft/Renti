import type { PageServerLoad, PageServerLoadEvent } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';


type PageData = {
  message: string;
  user: any | null;
};

/**
 * Loads server-side data for the page.
 *
 * @param {object} context - Load event context
 * @param {App.Locals} context.locals - The current request's local data (e.g. user session)
 * @param {Record<string, string>} context.params - Dynamic route parameters
 * @returns {Promise<PageData>} - Data to be passed to the page
 */
export const load: PageServerLoad = async ({ locals, params }: PageServerLoadEvent): Promise<PageData> => {
  //const { appUser } = await locals.getUsers() ?? null;

  return {
    message: 'Hello from +page.server.ts',
    user: null
  };
};

/**
 * Handles login and signup actions using SvelteKit form actions.
 */
export const actions: Actions = {
  /**
   * Authenticates a user by email and password.
   *
   * @param request - The incoming form request.
   * @returns Redirects to dashboard or returns error message.
   */
  signin: async ({ locals, request }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    const { error } = await locals.supabase.auth.signInWithPassword({
      email,
      password
    });

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
   * @returns Redirects to confirmation page or returns error.
   */
  signup: async ({ locals, request }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';
    const confirmPassword = formData.get('confirm_password')?.toString() ?? '';

    if (password !== confirmPassword) {
      return fail(400, {
        message: 'Las contraseñas no coinciden.'
      });
    }

    const { error } = await locals.supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return fail(400, {
        message: error.message ?? 'Error al registrar. Intenta con otro correo.'
      });
    }

    throw redirect(303, '/auth?action=signin');
  }
};
