<script lang="ts">
	import { House } from '@lucide/svelte';
  import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { LottiePlayer } from '$lib';

	function handleClickHome(event: MouseEvent) {
		if (event.button !== 0) return;

		goto('/', { replaceState: true });
	}
</script>

<main class="error-page">
	<LottiePlayer src="/anims/Sad-Emotion.json" />
	<h2>{page.error?.message || 'Ocurrió un error inesperado'}</h2>
	<p>Lo sentimos, algo salió mal. Intenta nuevamente o vuelve a la página principal.</p>
	<p>
		Tambien puedes
		<a href="mailto:support@andorasoft.com">contactar con soporte.</a>
	</p>
	<button class="primary" on:click={handleClickHome}>
		<House size="20" />
		Ir al inicio
	</button>
</main>

<style lang="scss">
	main.error-page {
		grid-area: main;

    padding: 0 2rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		text-align: center;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
		}

		h2 {
			color: var(--color-primary);

			font-size: 1.75rem;
			margin-bottom: 1rem;
		}

		p {
			color: var(--text-medium);

			max-width: 500px;
			margin-bottom: 2rem;
			font-size: 1rem;
		}
	}
</style>
