<script lang="ts">
	import type { FullAutoFill } from 'svelte/elements';
	import { EyeOff, Eye, X } from '@lucide/svelte';
	import { nanoid } from 'nanoid';

	/**
	 * Inline styles applied to the root `<div>` element.
	 *
	 * @default ""
	 * @example "margin-top: 1rem; width: 100%;"
	 */
	export let style: string = '';

	/**
	 * Additional custom class names applied to the root container.
	 *
	 * @default ""
	 * @example "mb-4 w-full"
	 */
	export let className: string = '';

	/**
	 * Unique ID for the input element.
	 * Generated automatically if not provided.
	 *
	 * @default random nanoid
	 */
	export let id: string = nanoid(12);

	/**
	 * Name attribute of the input.
	 *
	 * @default null
	 * @example "email"
	 */
	export let name: string | null = null;

	/**
	 * The current value of the input.
	 * Two-way bound using `bind:value`.
	 *
	 * @default null
	 */
	export let value: any = null;

	/**
	 * Text label displayed above the input.
	 *
	 * @default ""
	 * @example "Correo electrónico"
	 */
	export let title: string = '';

	/**
	 * Leading icon (Svelte component) displayed on the left.
	 *
	 * @default null
	 * @example User
	 */
	export let icon: any = null;

	/**
	 * Placeholder text displayed inside the input.
	 *
	 * @default ""
	 * @example "Ingresa tu contraseña"
	 */
	export let placeholder: string = '';

	/**
	 * Marks the input as required for form validation.
	 *
	 * @default false
	 */
	export let required: boolean = false;

	/**
	 * Disables the input field.
	 *
	 * @default false
	 */
	export let disabled: boolean = false;

	/**
	 * Marks the input as read-only.
	 *
	 * @default false
	 */
	export let readonly: boolean = false;

	/**
	 * Error message shown below the input. Also sets `aria-invalid` and `aria-describedby`.
	 *
	 * @default null
	 * @example "Este campo es obligatorio"
	 */
	export let error: string | null = null;

	/**
	 * Autocomplete attribute for browser autofill.
	 * Supports types from the `FullAutoFill` type.
	 *
	 * @default null
	 * @example "current-password"
	 */
	export let autocomplete: FullAutoFill | null = null;

	/**
	 * Input type. Controls the keyboard shown and validation.
	 * If "password", toggles visibility with a button.
	 *
	 * @default "text"
	 */
	export let type: 'text' | 'email' | 'password' = 'text';

	/**
	 * Internal state to toggle visibility of password type inputs.
	 */
	let showPassword: boolean = false;

	/**
	 * Tracks whether the input is currently focused.
	 */
	let focused: boolean = false;

	/**
	 * Optional override for the trailing icon.
	 */
	let endIcon: any = null;

	/**
	 * Derived input type (text if showing password).
	 */
	$: effectiveType = type === 'password' && showPassword ? 'text' : type;

	/**
	 * Determines which trailing icon to show:
	 * - Eye/EyeOff for password
	 * - CircleX for clear
	 * - null if readonly or not focused
	 */
	$: iconToRender =
		endIcon ??
		(type === 'password'
			? showPassword
				? EyeOff
				: Eye
			: focused && value && !readonly
				? X
				: null);

	/** Sets focus state to true */
	function handleFocus(event: FocusEvent): void {
		focused = true;
	}

	/** Sets focus state to false */
	function handleBlur(event: FocusEvent): void {
		focused = false;
	}

	/**
	 * Handles click on trailing icon:
	 * - Toggles password visibility if `type === password`
	 * - Clears value otherwise
	 */
	function handleIconClick(event: MouseEvent): void {
		if (type === 'password') {
			showPassword = !showPassword;
		} else {
			value = null;
		}
	}
</script>

<div {style} class={`text-box ${className}`}>
	<strong>{title}</strong>

	<label for={id} class:disabled class:readonly class:focused>
		<!-- Leading icon -->
		<svelte:component this={icon} size="20" color="var(--text-placeholder)" />

		<!-- Input element -->
		<input
			{id}
			{placeholder}
			{required}
			{disabled}
			{readonly}
			{name}
			{autocomplete}
			bind:value
			type={effectiveType}
			aria-label={placeholder}
			aria-invalid={!error}
			aria-describedby={error ? `${id}-error` : undefined}
			on:focus={handleFocus}
			on:blur={handleBlur}
		/>

		<!-- Trailing icon (eye, clear, or custom) -->
		{#if iconToRender}
			<button
				type="button"
				tabindex="-1"
				class="ghost"
				on:mousedown|preventDefault
				on:click={handleIconClick}
			>
				<svelte:component this={iconToRender} size="24" color="var(--text-placeholder)" />
			</button>
		{/if}
	</label>

	<!-- Error message -->
	{#if error}
		<p id="{id}-error" class="error-text" role="alert" aria-live="assertive">
			<img src="/icons/Error-Alert.svg" alt="" />
			{error}
		</p>
	{/if}
</div>

<style lang="scss">
	div.text-box {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;

		padding: 0 0.75rem;
		height: 3rem;

		display: flex;
		align-items: center;
		gap: 0.5rem;

		transition: background-color 0.2s ease-in-out;

		&.readonly {
			& > input {
				color: var(--color-placeholder);
			}

			&:hover {
				background-color: var(--color-background);
			}
		}

		&:hover {
			background-color: var(--hover-input);
		}
	}

	input {
		color: var(--text-high);
		height: 100%;

		flex: 1;

		&::placeholder {
			color: var(--text-placeholder);
		}
	}

	button {
		background-color: transparent !important;
		min-width: auto;
		min-height: auto;

		display: grid;
		place-items: center;
	}

	p {
		color: var(--color-error);

		display: flex;
		align-items: center;
		gap: 0.5rem;

		& img {
			width: 1.25rem;
			height: 1.25rem;
		}
	}
</style>
