import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { dev } from '$app/environment';

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

import { normalize } from '$lib/utils';
import { router } from '$lib/router';

/**
 * Middleware that sets up a Supabase client instance for each incoming request.
 * It attaches the Supabase client and a validated session to `event.locals`.
 */
const supabase: Handle = async ({ event, resolve }) => {
  /**
   * Create a Supabase client scoped to the current request using cookie-based auth.
   */
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        /**
         * Reads all request cookies.
         * Required to extract Supabase auth tokens (access/refresh).
         */
        getAll: () => event.cookies.getAll(),

        /**
         * Sets auth cookies for the response (used for token refresh, etc.).
         * Ensures cookies are scoped to root path.
         */
        setAll: (cookiesToSet: { name: string; value: string; options: CookieOptions }[]) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: '/', secure: !dev });
          });
        }
      }
    }
  );

  /**
   * Custom helper to retrieve the current session and user,
   * including JWT validation via `auth.getUser()`.
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();

    if (!session) {
      return { session: null, user: null }
    }

    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser();

    if (error) {
      // JWT validation has failed
      return { session: null, user: null }
    }
    return { session, user }
  }

  /**
   * Resolves the request, while allowing Supabase-specific response headers to pass through.
   */
  return resolve(event, {
    filterSerializedResponseHeaders: (name) =>
      name === 'content-range' || name === 'x-supabase-api-version'
  });
};

/**
 * Middleware that enforces route access control based on session state.
 * Redirects users based on whether they are authenticated or not.
 */
const authGuard: Handle = async ({ event, resolve }) => {
  const { session } = await event.locals.getSession();
  const pathname = normalize(event.url.pathname);
  const current = router.find(
    (r) => r.path === pathname
  );

  /**
   * Redirect unauthenticated users trying to access protected routes.
   * Adjust `/private` to match your own route structure (e.g., `/app`).
   */
  if (!session && current?.protected) {
    return redirect(303, '/auth?action=sign-in');
  }

  /**
   * Redirect authenticated users away from the login page.
   */
  if (session && !current?.protected) {
    return redirect(303, '/');
  }

  return resolve(event);
};

/**
 * Main server-side handler composed using `sequence()` to combine middleware.
 * - `supabase`: Initializes Supabase client and session for each request.
 * - `authGuard`: Protects routes based on authentication state.
 */
export const handle: Handle = sequence(supabase, authGuard);