import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { supabase, router } from '$lib';

export const handle: Handle = async ({ event, resolve }) => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  console.log(session);

  event.locals.user = session?.user ?? null;

  // const current = router.find((r) => r.path === event.url.pathname);

  // if (current?.protected && !session) {
  //   throw redirect(303, '/login');
  // }

  // if (current && !current.protected && session) {
  //   throw redirect(303, '/');
  // }

  return resolve(event);
};
