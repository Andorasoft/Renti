import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';

/**
 * Loads server-side layout data.
 *
 * @param {object} context - Layout load event context
 * @param {App.Locals} context.locals - Server-local values available in the request
 * @returns {Promise<LayoutData>} - Shared layout-level data
 */
export const load: LayoutServerLoad = async (
  { locals }: LayoutServerLoadEvent
): Promise<any> => {
  const config = locals.config;

  return {
    config
  };
}
