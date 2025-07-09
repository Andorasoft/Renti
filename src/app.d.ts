import type { AuthUser, Session, SupabaseClient, User } from '@supabase/supabase-js';

import type { AppUser } from '$lib';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient,
			getSession(): Promise<{ session: Session | null }>,
			getUsers(): Promise<{ auth: AuthUser | null, app: AppUser | null }>
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };