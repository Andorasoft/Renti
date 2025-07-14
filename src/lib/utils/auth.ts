import type { AuthChangeEvent } from '@supabase/supabase-js';
import { goto } from '$app/navigation';
import { supabase } from '../supabase';

let authListenerInitialized = false;

export function initAuthListener() {
  if (authListenerInitialized) return;
  authListenerInitialized = true;

  supabase.auth.onAuthStateChange((event: AuthChangeEvent): void => {
    //const urlParams = new URLSearchParams(window.location.search);

    switch (event)
    {
      case 'SIGNED_IN':
        //goto('/', { replaceState: true });
        break;
      case 'SIGNED_OUT':
        goto('/auth?action=signin', { replaceState: true });
        break;
    }
  });
};