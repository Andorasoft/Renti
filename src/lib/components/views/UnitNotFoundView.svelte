<script lang="ts">
	import { Copy } from '@lucide/svelte';
	import LottiePlayer from '../LottiePlayer.svelte';
</script>

<div class="view-container">
	<LottiePlayer src="/anims/Error.json" />
	<h2>¡Ups! <br /> No encontramos tu unidad</h2>
	<p>Aún no formas parte de ninguna unidad habitacional.</p>
	<div class="separator"></div>
	<p>Comparte el siguiente código con el propietario para que te pueda invitar:</p>
	<span class="invite-code">
		{'7fa9-c2bd'.toUpperCase()}
		<button class="btn-copy ghost">
			<Copy size="20" />
		</button>
	</span>
</div>

<style lang="scss">
	div.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;

		padding: 0.5rem 1rem;
	}

	h2 {
		margin-top: 1rem;
	}

	p {
		color: var(--text-low);
	}

	.invite-code {
		margin-top: 1rem;

		letter-spacing: 0.75rem;
		font-size: 1.5rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.btn-copy {
		color: var(--text-low);

		align-self: center;
	}

	h2,
	p {
		text-align: center;
	}

	.separator {
		background-color: var(--color-border);

		margin: 1rem 0;
		width: 100%;
		height: 1px;
	}
</style>
