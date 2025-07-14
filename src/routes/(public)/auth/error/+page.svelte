<script lang="ts">
	import { page } from '$app/stores';
	import { LottiePlayer } from '$lib';

	// Obtener mensaje de error desde los parámetros de la URL
	const message =
		$page.url.searchParams.get('message') ??
		'Ha ocurrido un error inesperado durante la autenticación.';
</script>

<!-- <svelte:head>
	<title>Error de autenticación | Arrienda</title>
</svelte:head> -->
<main class="error-container">
	<LottiePlayer src="/anims/Sad-Face.json" style="width: 300px; height: 300px;" />
	<div class="error-box">
		<h1>⚠️ Error de autenticación</h1>
		<p>{message}</p>
		<a href="/auth?action=signing" class="retry-button">Volver al inicio de sesión</a>
	</div>
</main>

<style>
	main.error-container {
		grid-area: main;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.error-box {
		max-width: 500px;
		background: #fff;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.error-box h1 {
		color: #dc2626;
		font-size: 1.75rem;
		margin-bottom: 1rem;
	}

	.error-box p {
		font-size: 1rem;
		color: #444;
		margin-bottom: 1.5rem;
	}

	.retry-button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background-color: #dc2626;
		color: white;
		border-radius: 0.5rem;
		text-decoration: none;
		transition: background-color 0.2s ease-in-out;
	}

	.retry-button:hover {
		background-color: #b91c1c;
	}
</style>
