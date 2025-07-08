import { repository } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = (await locals.getSession())?.session;

  if (!session?.user) {
    return {};
  }

  const user = await repository.appUser.getByEmail(session.user.email!!);

  if (!user) {
    throw redirect(302, '/profile/setup');
  }
};
