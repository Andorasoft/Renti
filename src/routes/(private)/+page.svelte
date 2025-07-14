<script lang="ts">
	import { Bell } from '@lucide/svelte';
	import { AppPage, SearchBox, supabase } from '$lib';

	export let data: { user: any };

	async function handleClickSignOut(event: MouseEvent) {
		if (event.button !== 0) return;

		await supabase.auth.signOut();
	}
</script>

<AppPage>
	<section>
		<div class="top-bar">
			<div class="greeting">
				<h2>Hola, {data.user.name} 👋🏻</h2>
				<span>Nos alegra tenerte aquí</span>
			</div>
			<button class="ghost" aria-label="Buscar">
				<Bell />
			</button>
			<SearchBox placeholder="Buscar..." />
		</div>

		<div class="content">
			<h1>Welcome to SvelteKit</h1>
			<p>
				Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
			</p>

			<div style="opacity: 0.25; min-height: 500px; background-color: pink;"></div>
			<div style="opacity: 0.25; min-height: 500px; background-color: cyan;"></div>
			<div style="opacity: 0.25; min-height: 500px; background-color: green;"></div>
			<button class="accent" on:click={handleClickSignOut}>Cerrar sesión</button>
		</div>
	</section>
</AppPage>

<style lang="scss">
	.top-bar {
		padding: 0.5rem;

		display: grid;
		grid-template-columns: auto max-content;
		grid-template-rows: repeat(2, auto);
		row-gap: 1rem;

		& > :nth-child(1) {
			grid-area: 1 / 1 / 2 / 2;
			place-self: stretch start;
		}

		& > :nth-child(2) {
			grid-area: 1 / 2 / 2 / 3;
			place-self: center end;
		}

		& :global(.search-box) {
			grid-area: 2 / 1 / 3 /3;
		}
	}

	.greeting {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;

		& span {
			color: var(--text-low);
		}
	}

	.content {
		overflow-y: auto;
		padding: 0 0.5rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
