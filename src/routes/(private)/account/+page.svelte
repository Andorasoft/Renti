<script lang="ts">
	import { ChevronLeft } from '@lucide/svelte';
	import type { AppPageOptions } from '$lib';
	import { AppPage } from '$lib';

	const options: AppPageOptions = {
		left: {
			label: 'Atrás',
			content: ChevronLeft
		}
	};
</script>

<AppPage title="Cuenta" {options}>
	<div class="content"></div>
</AppPage>

<style lang="scss">
	.content {
		height: 100%;
	}
</style>
