import type { PageLoad, PageLoadEvent } from './$types';
import { redirect } from '@sveltejs/kit';

/**
 * List of valid `action` query parameters allowed on the /auth page.
 * Must match the available authentication modes in the UI.
 */
const AUTH_ACTIONS = ['signin', 'signup'];

/**
 * Page load function for the /auth route.
 * 
 * Ensures that the `action` query parameter is present and valid.
 * - If `action` is missing or invalid, the user is redirected to the default action.
 * - If valid, the current action and full list are returned to the page component.
 * 
 * @param {Object} event - Load event object provided by SvelteKit.
 * @param {URL} event.url - URL of the current request, including query params.
 * @returns {{ action: string, actions: readonly string[] }} - Validated current action and full list.
 * @throws {Redirect} - If the `action` is invalid, redirects to the default.
 */
export const load: PageLoad = ({ url }: PageLoadEvent): { action: string } => {
  const defaultAction = AUTH_ACTIONS[0];
  const currentAction = url.searchParams.get('action') ?? '';

  if (!AUTH_ACTIONS.includes(currentAction)) {
    throw redirect(302, `?action=${defaultAction}`);
  }

  return {
    action: currentAction
  };
};