<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import TextBox from './TextBox.svelte';
	import { ArrowLeft, Mail } from '@lucide/svelte';

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

	let email: string = '';

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
	method="POST"
	class="password-reset-form"
	use:enhance
	on:submit={handleSubmit}
>
	<h2>
		<img src="/icons/AppLogo.svg" alt="" />
		Restablecer contraseña
	</h2>
	<p>Ingresa tu correo electrónico y te enviaremos un enlace para crear una nueva contraseña</p>

	<TextBox
		icon={Mail}
		type="email"
		name="email"
		bind:value={email}
		title="Correo electrónico"
		placeholder="Escribe tu correo electrónico"
		required
	/>

	<button class="primary" type="submit">Enviar enlace</button>

	<a href="/auth?action=signin">
		<ArrowLeft />
		Volver al inicio de sesión
	</a>
</form>

<style lang="scss">
	form.password-reset-form {
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

		margin-bottom: 1.5rem;
	}

	a {
		margin-top: 1.5rem;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
</style>
