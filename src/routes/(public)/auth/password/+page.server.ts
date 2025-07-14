import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { dev } from '$app/environment';

/**
 * Handles password reset and recovery actions using SvelteKit form actions.
 */
export const actions: Actions = {
  /**
   * Sends a password reset email to the user.
   *
   * @param request - The incoming form request.
   * @returns Redirects to signin page or returns error message.
   */
  reset: async ({ locals, request, url }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString().trim() ?? '';

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return fail(400, {
        message: 'Ingresa un correo electrónico válido.'
      });
    }

    const { error } = await locals.supabase.auth.resetPasswordForEmail(
      email, {
      redirectTo: `${url.origin}/auth/callback?type=recovery`
    });

    if (error) {
      return fail(400, {
        message:
          error.message === 'Email not confirmed'
            ? 'Debes confirmar tu correo electrónico antes de solicitar un cambio de contraseña.'
            : 'No se pudo enviar el enlace de recuperación. Verifica el correo ingresado.'
      });
    }

    throw redirect(303, '/auth?action=signin');
  },

  /**
   * Updates the user's password after recovery email.
   *
   * @param request - The incoming form request.
   * @returns Redirects to home or returns error message.
   */
  recovery: async ({ locals, request }) => {
    const formData = await request.formData();
    const password = formData.get('password')?.toString() ?? '';
    const confirmPassword = formData.get('confirm_password')?.toString() ?? '';

    if (!password || !confirmPassword) {
      return fail(400, {
        message: 'Debes ingresar y confirmar la nueva contraseña.'
      });
    }

    if (password.length < 8) {
      return fail(400, {
        message: 'La contraseña debe tener al menos 8 caracteres.'
      });
    }

    if (password !== confirmPassword) {
      return fail(400, {
        message: 'Las contraseñas no coinciden.'
      });
    }

    const { error } = await locals.supabase.auth.updateUser({ password });

    if (error) {
      console.log(`✳️[Recovery] Cambio de contraseña ${error}`);

      return fail(400, {
        message:
          error.message === 'New password should be different from the old password'
            ? 'Debes ingresar una contraseña diferente a la anterior.'
            : 'No se pudo actualizar la contraseña. Inténtalo nuevamente.'
      });
    }

    throw redirect(303, '/');
  }
};