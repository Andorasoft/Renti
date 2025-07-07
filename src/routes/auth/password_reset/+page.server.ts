import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { router } from '$lib/router';

/**
 * Load function for the /auth/password_reset page.
 *
 * Validates the `type` query parameter against the list of allowed values
 * defined in the central `router` configuration.
 *
 * If the `type` is missing or not among the accepted values,
 * the user is redirected to the default path (/auth/password_reset).
 *
 * This is particularly useful when handling Supabase magic links, where
 * `type=recovery` or an empty `type` parameter are expected.
 *
 * Returns the validated `type` and the full list of allowed types
 * for use in the page component.
 */
export const load: PageServerLoad = ({ url }) => {
  const route = router.find(r => r.name === 'password-reset');

  if (!route) {
    throw new Error('Route "password-reset" not defined in the router configuration.');
  }

  const types = route.queryParams?.type ?? [];
  const type = url.searchParams.get('type') ?? '';

  if (!types.includes(type)) {
    throw redirect(302, route.path);
  }

  return { type, types };
};