<script lang="ts">
	import { createEventDispatcher, type EventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { BarItem, BarItemLabelMode, BottomBarEvent } from '$lib';

	/**
	 * Inline style string applied to the root element.
	 * @type {string}
	 */
	export let style: string = '';

	/**
	 * CSS class names applied to the root element.
	 * @type {string}
	 */
	export let className: string = '';

	/**
	 * List of navigation items to display.
	 * @type {BarItem[]}
	 */
	export let items: BarItem[] = [];

	/**
	 * Controls how labels are displayed for each navigation item.
	 *
	 * - `'labeled'`: All items show labels.
	 * - `'unlabeled'`: No labels are shown, only icons.
	 * - `'selected'`: Only the active item shows its label.
	 *
	 * @default 'unlabeled'
	 * @type {BarItemLabelMode}
	 */
	export let labelMode: BarItemLabelMode = 'labeled';

	/**
	 * Creates a typed dispatcher for BottomBar events.
	 * @type {EventDispatcher<BottomBarEvent>}
	 */
	const dispatch: EventDispatcher<BottomBarEvent> = createEventDispatcher();

	/**
	 * Current route path derived from the SvelteKit page store.
	 * @type {string}
	 */
	let currentRoute: string;
	$: currentRoute = $page.url.pathname;

	/**
	 * The currently active item based on the route.
	 * @type {BarItem | null}
	 */
	let currentItem: BarItem | null;
	$: currentItem = items.find((i) => i.path === currentRoute) ?? null;

	// Automatically dispatch 'select' event when currentItem changes.
	$: dispatch('select', { item: currentItem });

	/**
	 * Update the selected item and navigate to its route.
	 * Does nothing if the item is already selected.
	 *
	 * @param {BarItem} item - The item to activate.
	 * @returns {void}
	 */
	function update(item: BarItem): void {
		if (item.path === currentRoute) return;
		dispatch('select', { item });
		goto(item.path, { replaceState: true });
	}

	/**
	 * Handles mouse clicks on a navigation item.
	 * Ignores non-left clicks and already active items.
	 *
	 * @param {MouseEvent} event - The mouse click event.
	 * @param {BarItem} item - The clicked navigation item.
	 * @returns {void}
	 */
	function handleClick(event: MouseEvent, item: BarItem): void {
		if (event.button !== 0 || item.path === currentRoute) return;
		update(item);
	}

	/**
	 * Handles keyboard selection (Enter key) on a navigation item.
	 * Ignores already active items.
	 *
	 * @param {KeyboardEvent} event - The keyboard event.
	 * @param {BarItem} item - The focused navigation item.
	 * @returns {void}
	 */
	function handleKeydown(event: KeyboardEvent, item: BarItem): void {
		if (event.key !== 'Enter' || item.path === currentRoute) return;
		update(item);
	}
</script>

<nav {style} class={`bottom-bar ${className}`}>
	<ul class={`bottom-bar-list ${labelMode}`}>
		{#each items as item}
			<li class="bottom-bar-item">
				<a
					href={item.path}
					aria-label={item.label}
					aria-current={item.path === currentRoute ? 'page' : undefined}
					on:click|preventDefault={(e) => handleClick(e, item)}
					on:keydown|preventDefault={(e) => handleKeydown(e, item)}
				>
					<span class="material-symbols-rounded">{item.icon}</span>
					{#if labelMode === 'labeled'}
						<span class="label">{item.label}</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	nav.bottom-bar {
		background-color: var(--color-background);

		padding: 0.5rem 0;

		display: grid;
		place-items: stretch;
	}

	ul.bottom-bar-list {
		list-style: none;

		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	li.bottom-bar-item {
		flex: 1;
		padding: 0 0.5rem;
	}

	a {
		background-position: center;
		color: var(--text-placeholder);
		outline: none;

		display: grid;
		place-items: center;
		gap: 0.25rem;

		font-weight: 600;
		font-size: 0.85rem;

		&[aria-current='page'] {
			color: var(--color-primary);

			& .material-symbols-rounded {
				font-variation-settings:
					'FILL' 1,
					'wght' 300,
					'GRAD' 0,
					'opsx' 24;
			}
		}
	}

	.material-symbols-rounded {
		font-size: 1.8rem;

		font-variation-settings:
			'FILL' 0,
			'wght' 300,
			'GRAD' 0,
			'opsx' 24;
	}
</style>
