import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { router } from '$lib/router';

/**
 * Load function for the /auth page.
 * It validates the `action` query parameter against the list of allowed values
 * defined in the central `router` configuration.
 *
 * If the action is missing or invalid, it redirects to the default action.
 */
export const load: PageServerLoad = ({ url }) => {
  console.log(`You are in ${url.pathname}`);
  // Retrieve the route configuration for 'auth' from the central router definition
  const route = router.find(r => r.name === 'auth');

  if (!route) {
    throw new Error('Route "auth" not defined in the router configuration.');
  }

  const actions = route.queryParams?.action ?? []; // Access valid actions
  const action = url.searchParams.get('action') ?? '';

  // Redirect to default action if the current one is not valid
  if (!actions.includes(action)) {
    throw redirect(302, `/auth?action=${actions[0]}`);
  }

  // Return the validated action and full list for use in the page component
  return { action, actions };
};