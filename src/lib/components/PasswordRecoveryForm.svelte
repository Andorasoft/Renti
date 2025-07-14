<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import TextBox from './TextBox.svelte';
	import { Mail } from '@lucide/svelte';

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

	let password: string = '';

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
	method="POST"
	class="password-recovery-form"
	use:enhance
	on:submit={handleSubmit}
>
	<h2>
		<img src="/icons/AppLogo.svg" alt="" />
		Actualizar contraseña
	</h2>
	<p>Escribe tu nueva contraseña y confírmala para completar el proceso</p>

	<TextBox
		icon={Mail}
		type="password"
		name="password"
		bind:value={password}
		title="Nueva contraseña"
		placeholder="Ingresa una contraseña segura"
		required
	/>

	<TextBox
		icon={Mail}
		type="password"
		name="confirm_password"
		bind:value={confirmPassword}
		title="Confirmar nueva contraseña"
		placeholder="Vuelve a escribir la contraseña"
		required
	/>

	<button class="primary" type="submit">Guardar contraseña</button>
</form>

<style lang="scss">
	form.password-recovery-form {
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

	button {
		margin-top: 1.5rem;
	}
</style>
