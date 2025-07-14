import type { AuthChangeEvent } from '@supabase/supabase-js';
import { goto } from '$app/navigation';
import { dev } from '$app/environment';
import { supabase } from '../supabase';

let authListenerInitialized = false;

export function initAuthListener() {
  if (authListenerInitialized) return;
  authListenerInitialized = true;

  supabase.auth.onAuthStateChange((event: AuthChangeEvent): void => {
    if (dev) {
      console.log(`Auth state changed to: ${event}`);
    }

    if (event === 'SIGNED_IN') {
      goto('/', { replaceState: true });
    } else if (event === 'SIGNED_OUT') {
      goto('/auth?action=signin', { replaceState: true });
    }
  });
};