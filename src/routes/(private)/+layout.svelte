<script lang="ts">
	import { BottomBar, type BarItem } from '$lib';

	export let data: { items: BarItem[] };
</script>

<main>
	<slot />
</main>
<footer>
	<BottomBar items={data.items} />
</footer>

<style lang="scss">
	main {
		grid-area: main;

		overflow-y: auto;
	}

	footer {
		grid-area: footer;

		margin-bottom: 1rem;
	}
</style>
