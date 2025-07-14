<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { LockKeyhole, User } from '@lucide/svelte';
	import TextBox from './TextBox.svelte';
	import { enhance } from '$app/forms';
	import { supabase } from '$lib/supabase';
	import { toast } from 'svoast';

	/**
	 * SvelteKit form action used to handle server-side logic.
	 * Can be null if the form is managed manually or enhanced.
	 *
	 * @example action={form}
	 */
	export let action: any = null;

	/**
	 * Optional autocomplete handler or configuration for autofill.
	 * Typically passed down to support browser autofill functionality.
	 */
	export let autocomplete: AutoFillBase | null = null;

	/**
	 * Bound value for the email input field.
	 */
	let email: string = '';

	/**
	 * Bound value for the password input field.
	 */
	let password: string = '';

	const dispatch = createEventDispatcher();

	/**
	 * Handles the native submit event from the form.
	 * Forwards it using a custom Svelte `submit` event.
	 *
	 * @fires submit - Emits the native SubmitEvent to the parent component
	 */
	function handleSubmit(event: SubmitEvent) {
		dispatch('submit', event);
	}

	/**
	 * Placeholder for Facebook authentication logic.
	 *
	 * @todo Implement Facebook login logic
	 */
	function handleClickFacebook(event: MouseEvent) {
		TODO: 'Implement Facebook auth...';
	}

	/**
	 * Placeholder for Google authentication logic.
	 *
	 * @todo Implement Google login logic
	 */
	async function handleClickGoogle(event: MouseEvent) {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${origin}/auth/callback`,
				queryParams: {
					prompt: 'select_account'
				}
			}
		});

		if (error) {
			toast.error(
				error.message.includes('popup_closed_by_user')
					? 'Inicio de sesión cancelado.'
					: 'Error al iniciar sesión con Google. Intenta nuevamente.'
			);
		}
	}
</script>

<form
	{action}
	{autocomplete}
	method="POST"
	class="sign-in-form"
	use:enhance
	on:submit={handleSubmit}
>
	<h2>
		<img src="/icons/AppLogo.svg" alt="" />
		Iniciar sesión
	</h2>
	<p>Inicia sesión para acceder a tu cuenta y gestionar todo desde un solo lugar</p>

	<!-- Email input -->
	<TextBox
		bind:value={email}
		icon={User}
		type="email"
		name="email"
		title="Correo electrónico"
		placeholder="Ingresa tu correo electrónico"
		autocomplete="email"
		required
	/>

	<!-- Password input -->
	<TextBox
		bind:value={password}
		icon={LockKeyhole}
		type="password"
		name="password"
		title="Contraseña"
		placeholder="Ingresa tu contraseña"
		autocomplete="current-password"
		required
	/>

	<!-- Password recovery link -->
	<a href="/auth/password?type=reset">¿Olvidaste tu contraseña?</a>

	<!-- Submit button -->
	<button type="submit" class="primary">Iniciar sesión</button>

	<!-- Divider -->
	<span class="separator">o continúa con</span>

	<!-- Social login buttons -->
	<div class="social-container">
		<button type="button" on:click={handleClickFacebook}>
			<img class="icon" src="/icons/Facebook.svg" alt="Icono" />
			Facebook
		</button>
		<button type="button" on:click={handleClickGoogle}>
			<img class="icon" src="/icons/Google.svg" alt="Icono" />
			Google
		</button>
	</div>

	<!-- Sign-up CTA -->
	<p>
		¿Aún no tienes cuenta?
		<a href="?action=signup"> Crea una gratis </a>
	</p>
</form>

<style lang="scss">
	form.sign-in-form {
		width: 100%;
		height: auto;

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		margin-bottom: -0.5rem;

		display: flex;
		align-items: center;
		gap: 0.5rem;

		& img {
			width: 2.5rem;
			height: auto;
		}
	}

	p {
		color: var(--text-low);

		&:first-of-type {
			margin-bottom: 1.5rem;
		}

		&:last-of-type {
			margin-top: 1.5rem;

			text-align: center;
		}
	}

	a {
		margin-bottom: 1.5rem;

		text-align: end;
	}

	.separator {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;

		margin: 1rem 0;

		color: var(--text-low);

		&::before,
		&::after {
			content: '';
			flex: 1;
			height: 1px;
			background-color: var(--text-placeholder);
			opacity: 0.3;
		}
	}

	.social-container {
		display: flex;
		flex-direction: row;
		gap: 1rem;

		& button {
			flex: 1;

			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
		}
	}
</style>
