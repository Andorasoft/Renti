<script lang="ts">
	import { SignInForm, SignUpForm } from '$lib';
	import { toast } from 'svoast';

	export let data: { action: string };
	export let form: any;

	$: if (form?.message) {
		toast.error(form.message);
	}
</script>

<main>
	{#if data.action === 'signin'}
		<SignInForm autocomplete="on" action="?/signin" />
	{:else}
		<SignUpForm autocomplete="off" action="?/signup" />
	{/if}
</main>

<style lang="scss">
	main {
		grid-area: main;

		overflow: auto;
		padding: 0 1.5rem;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
