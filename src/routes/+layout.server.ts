
// import type { BarItem } from '$lib/types/BarItem';
// import type { LayoutServerData } from './$types';

// const OWNER_ITEMS: BarItem[] = [
//   { label: 'Inicio', icon: 'home', path: '/' },
//   { label: 'Unidades', icon: 'domain', path: '/units' },
//   { label: 'Mantenimiento', icon: 'home_repair_service', path: '/requests' },
//   { label: 'Mi cuenta', icon: 'account_circle', path: '/account' }
// ];

// const TENANT_ITEMS: BarItem[] = [
//   { label: 'Inicio', icon: 'home', path: '/' },
//   { label: 'Unidad', icon: 'villa', path: '/unit' },
//   { label: 'Solicitudes', icon: 'sell', path: '/requests' },
//   { label: 'Cuenta', icon: 'account_circle', path: '/account' }
// ];

// /**
//  * Loads server-side layout data.
//  *
//  * @param {object} context - Layout load event context
//  * @param {App.Locals} context.locals - Server-local values available in the request
//  * @returns {Promise<LayoutData>} - Shared layout-level data
//  */
// export const load: LayoutServerData = async (
//   { locals }: LayoutServerLoadEvent
// ): Promise<any> => {
//   const name = 'Ricardo';
//   let role = 'tenant';

//   return {
//     config: locals.config,
//     user: {
//       name,
//       role
//     },
//     items: role === 'owner'
//       ? OWNER_ITEMS
//       : TENANT_ITEMS
//   };
// };
