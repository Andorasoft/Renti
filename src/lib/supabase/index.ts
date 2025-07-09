// src/lib/supabase/index.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createBrowserClient } from '@supabase/ssr';
import { goto } from '$app/navigation';

export const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
  global: {
    fetch,
  },
});

let authListenerInitialized = false;

export function initAuthListener() {
  if (authListenerInitialized) return;
  authListenerInitialized = true;

  supabase.auth.onAuthStateChange((event, session): void => {
    console.log(`Auth state changed to: ${event}`);

    if (event === 'SIGNED_IN') {
      //goto('/', { replaceState: true });
    } else if (event === 'SIGNED_OUT') {
      goto('/auth?action=sign-in', { replaceState: true });
    }
  });
};