<script lang="ts">
	//import { initAuthListener } from '$lib';
	import '$lib/styles/app.css';
	import { onMount } from 'svelte';
	import { Toasts } from 'svoast';

	// document.cookie = 'theme=dark; path=/';
	// location.reload();

	onMount(() => {
		//initAuthListener();
	});
</script>

<svelte:head>
	<title>Reti — Gestión de arriendos</title>
</svelte:head>
<div style="display: contents;">
	<slot />
	<Toasts position="top-right" />
</div>
