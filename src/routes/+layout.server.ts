import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { AuthUser } from '@supabase/supabase-js';
import { dev } from '$app/environment';

import { normalize } from '$lib/utils';
import { AppUser } from '$lib';

const ONBOARDING_PATH = '/onboarding';

/**
 * Server-side layout load function for SvelteKit.
 * This function is executed during SSR to verify user authentication and
 * ensure that the user has a corresponding `app_user` profile.
 * 
 * If the user is not authenticated, the function simply returns an empty object.
 * If authenticated, it checks for a matching profile in the `app_user` table using the user's email.
 * 
 * Redirect logic:
 * - If the user does NOT have an app profile and is not on the onboarding page → redirect to onboarding.
 * - If the user HAS an app profile but is currently on the onboarding page → redirect to root (/).
 * 
 * @param {ServerLoadEvent} event - The SvelteKit server-side load event.
 * @param {import('@supabase/supabase-js').User} event.locals.supabase.auth.user - The authenticated Supabase user (if any).
 * @param {URL} event.url - The URL object for the current request.
 * @returns {Promise<{ user: import('@supabase/supabase-js').User } | {}>} The authenticated user object if available.
 * @throws {Redirect} Throws a redirect if onboarding state does not match user profile existence.
 */
export const load: LayoutServerLoad = async ({ locals, url }: ServerLoadEvent): Promise<{
  authUser: AuthUser | null,
  appUser: AppUser | null
} | {}> => {
  const { auth, app } = await locals.getUsers();
  const pathname = normalize(url.pathname);

  if (auth && !app && pathname !== ONBOARDING_PATH) {
    throw redirect(302, ONBOARDING_PATH);
  }

  if (auth && app && pathname === ONBOARDING_PATH) {
    throw redirect(302, '/');
  }

  return {
    authUser: auth,
    appUser: app
  };
};