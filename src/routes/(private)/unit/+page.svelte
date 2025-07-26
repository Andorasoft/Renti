<script lang="ts">
	import { HelpCircle } from '@lucide/svelte';
	import Swal from 'sweetalert2';
	import type { AppConfig, AppPageOptions } from '$lib';
	import { AppPage, UnitNotFoundView } from '$lib';

	export let data: { config: AppConfig };

	const unit: any = null;

	const options: AppPageOptions = {
		left: {
			label: 'Ayuda',
			content: HelpCircle,
			onClick(event) {
				Swal.fire({
					title: '¿Qué es mi Unidad?',
					html: `
						<div style="text-align: left; max-width: 100%;">
							<p>Es el departamento que estás arrendando.</p>
							<ul style="padding:0 1.25rem;">
								<li>📄 Revisa los detalles del arriendo.</li>
								<li>🛠 Envía solicitudes de mantenimiento.</li>
								<li>📆 Consulta tu contrato activo.</li>
							</ul>
						</div>
					`,
					icon: 'info',
					confirmButtonText: 'Entendido',
					theme: data.config.theme
				});
			}
		}
	};
</script>

<AppPage {options} title="Unidad">
	<div class="content">
		{#if !unit}
			<UnitNotFoundView />
		{/if}
	</div>
</AppPage>

<style lang="scss">
	.content {
		padding: 0rem 0.5rem;
		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
