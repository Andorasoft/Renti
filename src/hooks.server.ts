import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON } from '$env/static/public';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { dev } from '$app/environment';


/**
 * Middleware that sets up a Supabase client instance for each incoming request.
 * It attaches the Supabase client and a validated session to `event.locals`.
 */
const supabase: Handle = async ({ event, resolve }) => {
  const { url, cookies, locals } = event;

  if (dev) {
    console.log('🔄 [hooks] Llamado desde ruta:', url.pathname);
  }

  locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON,
    {
      cookies: {
        getAll: () => cookies.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options: CookieOptions }[]) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, { ...options, path: '/', secure: !dev });
          });
        }
      }
    }
  );

  locals.getSession = async () => {
    const {
      data: { session }
    } = await locals.supabase.auth.getSession();

    if (!session) return { session: null };

    return { session };
  };

  locals.getUsers = async () => {
    const {
      data: { user: authUser }
    } = await locals.supabase.auth.getUser();

    if (!authUser) return { authUser: null, appUser: null };

    const appUser = await locals.supabase
      .from("user")
      .select("*")
      .eq("email", authUser.email)
      .maybeSingle();

    return { authUser: authUser, appUser };
  }

  return resolve(event, {
    filterSerializedResponseHeaders: (name) =>
      name === 'content-range' || name === 'x-supabase-api-version'
  });
};

/**
 * Middleware that enforces route access control based on session state.
 * Redirects users based on whether they are authenticated or not.
 */
const authGuard: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;

  // Only /auth and its children are public
  const isPublic = pathname.startsWith('/auth');

  const { session } = await event.locals.getSession();

  // Redirect unauthenticated users accessing protected routes
  if (!session && !isPublic) {
    throw redirect(303, '/auth?action=signin');
  }

  // Redirect authenticated users trying to access public login pages
  if (session && isPublic) {
    throw redirect(303, '/');
  }

  return resolve(event);
};

/**
 * Middleware that sets user preferences such as language and theme from cookies.
 * Sets values into `event.locals.lang` and `event.locals.theme`.
 */
const preferences: Handle = async ({ event, resolve }) => {
  const theme: any = event.cookies.get('theme') ?? 'dark';
  const lang: any = event.cookies.get('lang') ?? 'es';

  event.locals.config = { theme, lang };

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace(
        /<html.*?>/,
        `<html lang="${lang}" class="${theme}">`
      )
  });
};

/**
 * Main server-side handler composed using `sequence()` to combine middleware.
 */
export const handle: Handle = sequence(supabase, authGuard, preferences);