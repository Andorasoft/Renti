<script lang="ts">
	import {
		Bell,
		ChevronRight,
		FileText,
		FolderOpen,
		Globe,
		HelpCircle,
		Home,
		Lock,
		MessageCircle,
		Moon
	} from '@lucide/svelte';
	import type { AppPageOptions, User } from '$lib';
	import { AppPage, supabase } from '$lib';

	export let data: { appUser: User };

	const options: AppPageOptions = {
		right: {
			label: '',
			content: 'Cerrar sesión',
			style: 'padding: 0 0.75rem;',
			async onClick(event) {
				if (event.button !== 0) return;

				await supabase.auth.signOut();
				await supabase.auth.refreshSession();
			}
		}
	};
</script>

<AppPage {options}>
	<div class="content">
		<div class="card-user">
			<img src={data.appUser?.picture_url} alt="Imagen de perfil" />
			<h2>{data.appUser?.first_name} {data.appUser?.last_name}</h2>
			<p>#{data.appUser?.invite_code?.toUpperCase()}</p>
		</div>

		<span>Mi actividad</span>
		<ul>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<Home size="20" />
					</div>
					<p>Mis unidades</p>
					<ChevronRight size="20" />
				</a>
			</li>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<FileText size="20" />
					</div>
					<p>Mis solicitudes</p>
					<ChevronRight size="20" />
				</a>
			</li>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<FolderOpen size="20" />
					</div>
					<p>Documentos</p>
					<ChevronRight size="20" />
				</a>
			</li>
		</ul>

		<span>Configuración</span>
		<ul>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<Globe size="20" />
					</div>
					<p>Idioma</p>
					<ChevronRight size="20" />
				</a>
			</li>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<Bell size="20" />
					</div>
					<p>Notificaciones</p>
				</a>
			</li>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<Moon size="20" />
					</div>
					<p>Modo oscuro</p>
				</a>
			</li>
		</ul>

		<span>Cuenta</span>
		<ul>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<Lock size="20" />
					</div>
					<p>Cambiar contraseña</p>
					<ChevronRight size="20" />
				</a>
			</li>
		</ul>

		<span>Soporte</span>
		<ul>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<HelpCircle size="20" />
					</div>
					<p>Centro de ayuda</p>
					<ChevronRight size="20" />
				</a>
			</li>
			<li>
				<a href="?x=1">
					<div class="icon-container">
						<MessageCircle size="20" />
					</div>
					<p>Contáctanos</p>
					<ChevronRight size="20" />
				</a>
			</li>
		</ul>

		<p style="margin-top: 1.5rem;">
			© 2025 Andorasoft S.A.
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
			user-select: text;

			margin-bottom: 1.5rem;
			letter-spacing: 0.1rem;
		}
	}

	.icon-container {
		background-color: var(--hover-input);
		border-radius: 0.5rem;

		padding: 0.4rem;

		display: grid;
		place-items: center;
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
		color: var(--text-low);

		padding: 0.2rem 0;

		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;

		transition: background-color 0.2s ease-in;

		& :nth-child(2) {
			flex: 1;

			text-align: start;

			color: var(--text-high);
		}

		&:hover {
			background-color: var(--hover-input);
		}
	}
</style>
