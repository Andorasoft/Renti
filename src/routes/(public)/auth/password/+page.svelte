<script lang="ts">
	import { PasswordRecoveryForm, PasswordResetForm } from '$lib';
	import { toast } from 'svoast';

	export let data: { type: string };
	export let form: any;

	$: if (form?.message) {
		toast.error(form.message);
	}
</script>

<main>
	{#if data.type === 'reset'}
		<PasswordResetForm autocomplete="off" action="?/reset" />
	{:else}
		<PasswordRecoveryForm autocomplete="off" action="?/recovery" />
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
