<script lang="ts">
	/**
	 * The maximum value of the progress bar.
	 * Can be a number or a string convertible to number.
	 *
	 * @default 3
	 * @example 100
	 */
	export let max: number | string = 3;

	/**
	 * The current value used to calculate progress.
	 * Can be a number or a string convertible to number.
	 *
	 * @default 1
	 * @example 40
	 */
	export let value: number | string = 1;

	/**
	 * Optional inline styles to apply to the root element.
	 * Useful for custom width, margin, etc.
	 *
	 * @default ""
	 * @example "width: 100%; margin-top: 1rem;"
	 */
	export let style: string = '';

	/**
	 * The calculated progress percentage (0 to 100).
	 * Automatically updated reactively when `value` or `max` changes.
	 */
	$: progress = Math.min((+value / +max) * 100, 100);
</script>

<!--
  Renders a horizontal progress bar.
  The outer div represents the container, and the inner fill div animates the width based on progress.
-->
<div {style} class="progress-bar">
	<div class="progress-fill" style="width: {progress}%"></div>
</div>

<style lang="scss">
	.progress-bar {
		background-color: var(--color-border);
		border-radius: 0.25rem;
		height: 0.5rem;
		overflow: hidden;
	}

	.progress-fill {
		background-color: var(--color-primary);
		height: 100%;
		transition: width 0.3s ease;
	}
</style>
