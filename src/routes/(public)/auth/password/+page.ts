import type { PageLoad, PageLoadEvent } from './$types';
import { redirect } from '@sveltejs/kit';

/**
 * List of valid `action` query parameters allowed on the /auth page.
 * Must match the available authentication modes in the UI.
 */
const RECOVERY_TYPES = ['reset', 'recovery'];

/**
 * Page load function for the /auth/password route.
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
export const load: PageLoad = ({ url }: PageLoadEvent): { type: string } => {
  const defaultType = RECOVERY_TYPES[0];
  const currentType = url.searchParams.get('type') ?? '';

  if (!RECOVERY_TYPES.includes(currentType)) {
    throw redirect(302, `?type=${defaultType}`);
  }

  return {
    type: currentType,
  };
};