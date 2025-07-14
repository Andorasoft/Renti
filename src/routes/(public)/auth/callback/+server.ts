import type { RequestEvent, RequestHandler } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

/**
 * Handles GET requests to the `/auth/callback` endpoint.
 *
 * This endpoint is used for processing Supabase authentication callbacks
 * such as OAuth login, magic link recovery, and signup confirmations.
 *
 * #### Supported `type` values:
 * - `recovery`: redirects to the password reset screen.
 * - `signup`: redirects to the login screen after confirmation.
 *
 * #### Behavior:
 * - If a `code` query param exists, the session is exchanged with Supabase.
 * - If a `type` param is recognized, appropriate redirects are triggered.
 * - If `error` query param exists, user is redirected to a friendly error page.
 *
 * @param {object} event - The request event object from SvelteKit.
 * @param {URL} event.url - The incoming request's URL object.
 * @param {App.Locals} event.locals - Server-side context, including Supabase client.
 *
 * @returns {Promise<Response>} A redirect or error response based on query parameters.
 *
 * @throws {Redirect} Redirects based on successful authentication or expected flows.
 * @throws {HttpError} 400 for invalid `type`, 404 for missing/invalid parameters.
 */
export const GET: RequestHandler = async ({ url, locals: { supabase } }: RequestEvent): Promise<Response> => {
  const code = url.searchParams.get('code');
  const type = url.searchParams.get('type');
  const errorParam = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  // Case 0: Error returned by Supabase
  if (errorParam) {
    const message = errorDescription || 'Authentication failed.';
    throw redirect(303, `/auth/error?message=${encodeURIComponent(message)}`);
  }

  // Case 1: OAuth login (e.g., Google)
  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      if (!dev) {
        console.error('OAuth session exchange failed:', exchangeError);
      }

      throw redirect(303, '/auth?action=signin&error=oauth_failed');
    }

    throw redirect(303, '/');
  }

  // Case 2: Magic link - password recovery
  if (type === 'recovery') {
    throw redirect(303, `/auth/password?type=${type}`);
  }

  // Case 3: Magic link - signup confirmation
  if (type === 'signup') {
    throw redirect(303, '/auth?action=signin');
  }

  // Case 4: Invalid `type` param provided
  if (type && !['recovery', 'signup'].includes(type)) {
    throw error(400, `Invalid callback type: "${type}"`);
  }

  // Case 5: No usable parameters — likely malformed URL or manual access
  throw redirect(303, `/auth/error?message=${encodeURIComponent('Callback parameters missing or invalid.')}`);
};
