<script lang="ts">
	import {
		Bell,
		FileText,
		FolderOpen,
		Globe,
		HelpCircle,
		Home,
		Lock,
		MessageCircle,
		Moon
	} from '@lucide/svelte';
	import type { AppPageOptions } from '$lib';
	import { AppPage } from '$lib';

	const options: AppPageOptions = {
		right: {
			label: 'Cerrar sesión',
			content: 'Cerrar sesión',
			style: 'padding: 0.75rem;'
		}
	};
</script>

<AppPage title="" {options}>
	<div class="content">
		<div class="card-user">
			<img src="/images/R+E.png" alt="Imagen de perfil" />
			<h2>Ricardo Carrión</h2>
			<p>#{'7fa9-c2bd'.toUpperCase()}</p>
		</div>

		<span>Mi actividad</span>
		<ul>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<Home />
					</div>
					Mis unidades
				</a>
			</li>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<FileText />
					</div>
					Mis solicitudes
				</a>
			</li>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<FolderOpen />
					</div>
					Documentos
				</a>
			</li>
		</ul>

		<span>Configuración</span>
		<ul>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<Globe />
					</div>
					Idioma
				</a>
			</li>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<Bell />
					</div>
					Notificaciones
				</a>
			</li>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<Moon />
					</div>
					Modo oscuro
				</a>
			</li>
		</ul>

		<span>Cuenta</span>
		<ul>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<Lock />
					</div>
					Cambiar contraseña
				</a>
			</li>
		</ul>

		<span>Soporte</span>
		<ul>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<HelpCircle />
					</div>
					Centro de ayuda
				</a>
			</li>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<MessageCircle />
					</div>
					Contáctanos
				</a>
			</li>
		</ul>

		<p style="margin-top: 1.5rem;">
			© 2025 Renti.
			<br />
			Todos los derechos reservados.
		</p>
	</div>
</AppPage>

<style lang="scss">
	.content {
		padding: 1rem;
		min-height: 100%;

		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
	}

	.card-user {
		align-self: center;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;

		& img {
			border-radius: 100%;

			width: 4.5rem;
			height: 4.5rem;
		}

		& p {
			margin-bottom: 1.5rem;
			letter-spacing: 0.1rem;
		}
	}

	.icon-container {
		background-color: var(--hover-input);
		border-radius: 0.5rem;

		padding: 0.35rem;

		display: grid;
		place-items: center;

		& :global(svg) {
			width: 20px;
			height: 20px;
		}
	}

	span {
		color: var(--text-low);

		margin-top: 1rem;
	}

	p {
		color: var(--text-low);

		text-align: center;
	}

	ul {
		list-style: none;

		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	a {
		border-radius: 0.5rem;
		color: var(--text-high);

		padding: 0.25rem 0;

		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;

		&:hover {
			background-color: var(--hover-input);
		}
	}
</style>
