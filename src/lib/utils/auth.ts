import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { goto } from '$app/navigation';
import { supabase } from '../supabase';
import { dev } from '$app/environment';

let authListenerInitialized = false;

export function initAuthListener() {
  if (authListenerInitialized) return;
  authListenerInitialized = true;

  supabase.auth.onAuthStateChange((event: AuthChangeEvent): void => {
    if (dev) {
      console.log(`Auth state changed to: ${event}`);
      console.log(`Localtion: ${window.location.pathname}`);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (event === 'SIGNED_IN') {
      // No redirigir si es recuperación
      if (type !== 'recovery') {
        goto('/', { replaceState: true });
      }
    } else if (event === 'SIGNED_OUT') {
      goto('/auth?action=signin', { replaceState: true });
    }
  });

};