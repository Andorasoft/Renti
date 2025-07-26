import type { PageServerLoad, PageServerLoadEvent } from './$types';
import type { Actions } from './$types';

/**
 * Loads server-side layout data.
 *
 * @param {object} context - Layout load event context
 * @param {App.Locals} context.locals - Server-local values available in the request
 * @returns {Promise<LayoutData>} - Shared layout-level data
 */
export const load: PageServerLoad = async (
  { locals }: PageServerLoadEvent
): Promise<any> => {
  const { authUser } = await locals.getUsers();

  return {
    authUser
  };
}

export const actions: Actions = {
  create: async ({ locals, request }) => {

  }
}