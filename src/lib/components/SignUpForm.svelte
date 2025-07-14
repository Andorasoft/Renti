<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { LockKeyhole, User } from '@lucide/svelte';
	import TextBox from './TextBox.svelte';
	import CheckBox from './CheckBox.svelte';
	import { enhance } from '$app/forms';

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

	/**
	 * Bound value for the confirm password input field.
	 */
	let confirmPassword: string = '';

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
</script>

<form
	{action}
	{autocomplete}
	use:enhance
	method="POST"
	class="sign-in-form"
	on:submit={handleSubmit}
>
	<h2>Inicia sesión</h2>
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
		placeholder="Crea una contraseña segura"
		autocomplete="current-password"
		required
	/>

	<!-- Confirm Password input -->
	<TextBox
		bind:value={confirmPassword}
		icon={LockKeyhole}
		type="password"
		name="confirm_password"
		title="Confirmar contraseña"
		placeholder="Repite la contraseña"
		autocomplete="current-password"
		required
	/>

	<CheckBox style="margin-bottom: 1.5rem;">
		<span>
			Acepto los
			<a href="/info/tos">términos y condiciones</a>
		</span>
	</CheckBox>

	<button type="submit" class="primary">Crear cuenta</button>

	<p>
		¿Ya tienes una cuenta?
		<a href="?action=signin">Inicia sesión</a>
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
	}

	p {
		&:first-of-type {
			margin-bottom: 1.5rem;
		}

		&:last-of-type {
			margin-top: 1.5rem;

			text-align: center;
		}
	}

	p,
	span {
		color: var(--text-low);
	}
</style>
