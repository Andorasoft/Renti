<script lang="ts">
	export let data: { type: string };
</script>

<main>
	{#if data.type === 'reset'}
		<div></div>
	{:else}
		<div></div>
	{/if}
</main>
