<script lang="ts">
	import { ChevronLeft, Mail, MapPin, UserRoundCog, UserRoundPen } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { ProgressBar, AppPage, supabase, TextBox, SelectBox } from '$lib';
	import type { AppPageOptions } from '$lib';

	export let data: { authUser: any };

	const steps = [{}, {}, {}, {}];

	const currentStep = 1;

	const options: AppPageOptions = {
		left: {
			label: 'Atrás',
			content: ChevronLeft,
			visible: currentStep > 1
		},
		right: {
			label: '',
			content: 'Cerrar sessión',
			style: 'padding: 0 0.75rem;',
			async onClick(event) {
				if (event.button !== 0) return;

				await supabase.auth.signOut();
				await supabase.auth.refreshSession();
			}
		}
	};
</script>

<main>
	<AppPage {options}>
		<div class="content">
			<div class="status-bar">
				<h2>Completa tu perfil</h2>
				<span>Paso {currentStep} de {steps.length}</span>
			</div>
			<ProgressBar />
			<div class="forms">
				<form action="" method="POST" autocomplete="off" use:enhance>
					<section>
						<TextBox
							icon={UserRoundPen}
							type="text"
							name="first_name"
							title="Nombre"
							placeholder="Escribe tu nombre"
							required
						/>
						<TextBox
							icon={UserRoundPen}
							type="text"
							name="last_name"
							title="Apellido"
							placeholder="Escribe tu apellido"
							required
						/>
						<TextBox
							value={data.authUser?.email}
							icon={Mail}
							type="email"
							name="email"
							title="Correo electrónico"
							placeholder="Ingresa tu correo electrónico"
							autocomplete="email"
							readonly
						/>
						<SelectBox
							icon={MapPin}
							name="country"
							title="País"
							items={[{ value: 1, content: 'Ecuador' }]}
						/>
						<SelectBox
							icon={UserRoundCog}
							name="account_type"
							title="Tipo de cuenta"
							items={[
								{ value: 1, content: 'Inquilino' },
								{ value: 2, content: 'Propietario' }
							]}
						/>
					</section>
				</form>
			</div>
			<div class="buttons">
				<button class="primary">Siguiente</button>
				<button class="ghost">Omitir</button>
			</div>
		</div>
	</AppPage>
</main>

<style lang="scss">
	main {
		grid-area: main;
	}

	form {
		padding: 1rem 0;

		& section {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}

	.content {
		padding: 1rem;
		padding-top: 0;
		height: 100%;

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.status-bar {
		display: flex;
		justify-content: space-between;

		& :nth-child(1) {
			margin-bottom: 0.5rem;
		}

		& :nth-child(2) {
			color: var(--text-low);

			align-self: end;
			margin-bottom: 0.5rem;
		}
	}

	.forms {
		flex: 1;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		& button.ghost {
			padding: 0.75rem 1.5rem;
		}
	}
</style>
