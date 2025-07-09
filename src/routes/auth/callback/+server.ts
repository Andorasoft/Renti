import { redirect, error, type RequestHandler } from '@sveltejs/kit';

/**
 * GET handler for the /callback route.
 *
 * Handles:
 * - OAuth redirects (`?code=...`) to exchange for a Supabase session.
 * - Magic links or password recovery (`?type=recovery|signup`) to redirect to appropriate UI.
 * - Malformed or unsupported parameters return appropriate HTTP error codes.
 */
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get('code');
  const type = url.searchParams.get('type');

  // Case 1: OAuth login (e.g., Google)
  if (code) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (err) {
      console.error('OAuth session exchange failed:', err);
      throw redirect(303, '/auth?action=signin&error=oauth_failed');
    }
    throw redirect(303, '/');
  }

  // Case 2: Magic link - password recovery
  if (type === 'recovery') {
    throw redirect(303, `/auth/password_reset?type=${type}`);
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
  throw error(404, 'Callback parameters missing or invalid');
};