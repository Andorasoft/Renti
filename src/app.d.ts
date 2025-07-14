import type { AuthUser, Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { AppConfig } from '$lib';

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
			getUsers(): Promise<{ authUser: AuthUser | null, appUser: any | null }>
		}
	}
}

export { };