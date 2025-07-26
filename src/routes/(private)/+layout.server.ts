import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';
import type { BarItem } from '$lib/types/BarItem';
import { redirect } from '@sveltejs/kit';

const OWNER_ITEMS: BarItem[] = [
  { label: 'Inicio', icon: 'home', path: '/' },
  { label: 'Unidades', icon: 'domain', path: '/units' },
  { label: 'Mantenimiento', icon: 'home_repair_service', path: '/requests' },
  { label: 'Mi cuenta', icon: 'account_circle', path: '/account' }
];

const TENANT_ITEMS: BarItem[] = [
  { label: 'Inicio', icon: 'home', path: '/' },
  { label: 'Unidad', icon: 'villa', path: '/unit' },
  { label: 'Solicitudes', icon: 'sell', path: '/requests' },
  { label: 'Cuenta', icon: 'account_circle', path: '/account' }
];

const ONBOARDING_ROUTE: string = '/onboarding';
const HOME_ROUTE: string = '/onboarding';

/**
 * Loads server-side layout data.
 *
 * @param {object} context - Layout load event context
 * @param {App.Locals} context.locals - Server-local values available in the request
 * @returns {Promise<LayoutData>} - Shared layout-level data
 */
export const load: LayoutServerLoad = async (
  { locals, url }: LayoutServerLoadEvent
): Promise<any> => {

  const { appUser } = await locals.getUsers();

  if (!appUser && url.pathname !== ONBOARDING_ROUTE) {
    throw redirect(302, ONBOARDING_ROUTE);
  }

  if (appUser && url.pathname === ONBOARDING_ROUTE) {
    throw redirect(302, HOME_ROUTE);
  }

  return {
    appUser: appUser?.toJSON(),
    items: appUser?.account_type === 'Propietario'
      ? OWNER_ITEMS
      : TENANT_ITEMS
  };
};
