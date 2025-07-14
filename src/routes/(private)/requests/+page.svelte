<script lang="ts">
	import { HelpCircle, Plus } from '@lucide/svelte';
	import Swal from 'sweetalert2';
	import type { AppConfig, AppPageOptions } from '$lib';
	import { AppPage } from '$lib';

	export let data: { config: AppConfig };

	const unit: any = null;

	const options: AppPageOptions = {
		left: {
			label: 'Ayuda',
			content: HelpCircle,
			onClick(event) {
				Swal.fire({
					title: '¿Qué son las Solicitudes?',
					html: `
						<p>Puedes reportar problemas o pedir mantenimiento de tu unidad.</p>
						<p>El propietario será notificado y dará seguimiento desde la plataforma.</p>
					`,
					icon: 'info',
					confirmButtonText: 'Entendido',
					theme: data.config.theme
				});
			}
		},
		right: {
			label: 'Crear solicitud',
			content: Plus,
			visible: !!unit
		}
	};
</script>

<AppPage title="Solicitudes" {options}>
	<div class="content">
		<span>Aún no has creado ninguna solicitud.</span>
	</div>
</AppPage>
<section>
	<div class="top-bar"></div>
</section>

<style lang="scss">
	.content {
		color: var(--text-low);

		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
