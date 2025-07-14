<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Search, CircleX } from '@lucide/svelte';
	import { nanoid } from 'nanoid';

	/**
	 * Inline styles applied to the root `<label>` element.
	 *
	 * @example "margin-top: 1rem; width: 100%;"
	 */
	export let style: string = '';

	/**
	 * Additional custom class names applied to the root label.
	 *
	 * @example "mb-4 w-full"
	 */
	export let className: string = '';

	/**
	 * Unique identifier for the input element.
	 * Generated with nanoid by default.
	 *
	 * @example "search-abc123"
	 */
	export let id: string = nanoid(12);

	/**
	 * Name attribute of the input element.
	 * Useful for form submission or identification.
	 *
	 * @example "searchQuery"
	 */
	export let name: string = '';

	/**
	 * The current value of the input. Two-way bound with `bind:value`.
	 * Can be cleared by the user via the clear button.
	 *
	 * @example "Departamento"
	 */
	export let value: any = null;

	/**
	 * Placeholder text displayed when the input is empty.
	 *
	 * @example "Buscar ciudad o unidad..."
	 */
	export let placeholder: string = '';

	/**
	 * Disables the input field when true.
	 *
	 * @default false
	 */
	export let disabled: boolean = false;

	/**
	 * Tracks whether the input is currently focused.
	 * Affects visibility of the clear button.
	 */
	let focused: boolean = false;

	const dispatch = createEventDispatcher();

	/**
	 * Emits a `enter` event when the user presses Enter.
	 *
	 * @param event - KeyboardEvent from the input
	 * @fires enter - With the current value
	 */
	function handleKeydown(event: KeyboardEvent): void {
		if (event.key !== 'Enter') return;
		dispatch('enter', { value });
	}

	/**
	 * Clears the input when clicking the clear (X) button.
	 * Only responds to left-click (button 0).
	 */
	function handleMouseDown(event: MouseEvent) {
		if (event.button !== 0) return;
		value = null;
	}

	/** Sets internal focus state to true */
	function handleFocus(event: FocusEvent): void {
		focused = true;
	}

	/** Sets internal focus state to false */
	function handleBlur(event: FocusEvent): void {
		focused = false;
	}
</script>

<label {style} class={`search-box ${className}`} class:focused class:disabled for={id}>
	<Search color="var(--text-placeholder)" />
	<input
		type="search"
		bind:value
		{id}
		{name}
		{placeholder}
		{disabled}
		aria-label={placeholder}
		on:focus={handleFocus}
		on:blur={handleBlur}
		on:keydown={handleKeydown}
	/>
	{#if focused && value}
		<button class="ghost" on:mousedown|preventDefault={handleMouseDown}>
			<CircleX />
		</button>
	{/if}
</label>

<style lang="scss">
	label.search-box {
		background-color: var(--color-surface);
		border: solid 1px var(--color-border);
		border-radius: 0.5rem;

		padding: 0 1rem;
		height: 3rem;

		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;

		transition: background-color 0.2s ease;

		&:hover {
			background-color: var(--hover-ghost);
		}

		&.focused {
			border-color: var(--color-accent-hover);
		}
	}

	input {
		flex: 1;

		background-color: transparent;
		color: var(--text-high);

		&::placeholder {
			color: var(--text-placeholder);
		}

		&::-webkit-search-cancel-button {
			display: none;
		}
	}

	button {
		background-color: transparent !important;
		color: var(--color-accent-hover);

		display: grid;
		place-items: center;

		min-width: auto;
		min-height: auto;
	}
</style>
