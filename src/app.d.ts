import type { AuthUser, Session, SupabaseClient } from '@supabase/supabase-js';
import type { AppConfig, User } from '$lib';

declare global {
	namespace App {
		// interface Error {
		// 	code: string,
		// 	message: string
		// }
		interface Locals {
			config: AppConfig
			supabase: SupabaseClient,
			getSession(): Promise<{ session: Session | null }>,
			getUsers(): Promise<{ authUser: AuthUser | null, appUser: User | null }>
		}
	}
}

export { };