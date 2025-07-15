<script lang="ts">
	import type { AppPageOptions } from '../types/AppPageOptions';

	/**
	 * Inline CSS styles applied to the root `<section>` element.
	 * @example "padding: 1rem;"
	 */
	export let style: string = '';

	/**
	 * CSS class names applied to the root element.
	 * @example "dashboard-page"
	 */
	export let className: string = '';

	/**
	 * Title displayed in the center of the top bar.
	 */
	export let title: string = '';

	/**
	 * Configuration object for left and right top bar actions.
	 */
	export let options: AppPageOptions | null = null;
</script>

<section {style} class={`app-page ${className}`}>
	{#if options !== null || title !== ''}
		<div class="top-bar">
			{#if options?.left?.visible !== false}
				<button
					style={options?.left?.style}
					aria-label={options?.left?.label}
					class="ghost bar-option-left"
					on:click={options?.left?.onClick}
				>
					{#if typeof options?.left?.content === 'string'}
						{options.left.content}
					{:else}
						<svelte:component this={options?.left?.content} />
					{/if}
				</button>
			{/if}

			<h2 class="bar-title">{title}</h2>

			{#if options?.right?.visible !== false}
				<button
					style={options?.right?.style}
					aria-label={options?.right?.label}
					class="ghost bar-option-right"
					on:click={options?.right?.onClick}
				>
					{#if typeof options?.right?.content === 'string'}
						{options?.right?.content}
					{:else}
						<svelte:component this={options?.right?.content} />
					{/if}
				</button>
			{/if}
		</div>
	{/if}

	<div class="content">
		<slot />
	</div>
</section>

<style lang="scss">
	section.app-page {
		display: grid;
		grid-template-rows: auto 1fr;

		height: 100%;
	}

	.top-bar {
		grid-area: 1 / 1 / 2 / 2;

		padding: 0.5rem;

		display: grid;
		grid-template-columns: auto 1fr auto;
		place-items: center center;
	}

	.bar-option-left {
		grid-area: 1 / 1 / 2 / 2;
	}

	.bar-title {
		grid-area: 1 / 1 / 2 / 4;
	}

	.bar-option-right {
		grid-area: 1 / 3 / 2 / 4;
	}

	.content {
		grid-area: 2 / 1 / 3 / 2;
	}
</style>
