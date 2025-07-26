<script lang="ts">
	import { nanoid } from 'nanoid';

	type SelectBoxItem = {
		value: any;
		content: any;
	};

	export let style: string = '';

	export let className: string = '';

	export let id: string = nanoid(12);

	export let name: string | null = null;

	export let value: any = null;

	export let title: string = '';

	export let icon: any = null;

	export let required: boolean = false;

	export let disabled: boolean = false;

	export let items: SelectBoxItem[] = [];
</script>

<div {style} class={`select-box ${className}`}>
	<strong>{title}</strong>
	<label for={id}>
		<svelte:component
			this={icon}
			size="20"
			style="margin: 0 0.75rem; color: var(--text-placeholder)"
		/>
		<select {id} {name} {required} {disabled} bind:value>
			{#each items as item}
				<option value={item.value}>{item.content}</option>
			{/each}
		</select>
	</label>
</div>

<style lang="scss">
	div.select-box {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		label {
			height: 3rem;

			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

	select {
		flex: 1;
		background-color: var(--color-background);
		border: solid 1px var(--color-border);
		border-radius: 0.5rem;
		color: var(--text-high);

		padding: 0 0.75rem;
		height: 3rem;

		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234B5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")
			no-repeat right 0.75rem center;
		background-size: 1rem;

		transition: var(--background-transition);

		&:hover {
			background-color: var(--hover-input);
		}
	}

	select,
	option {
		color: var(--text-high);
	}
</style>
