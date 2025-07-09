<script lang="ts">
  import { Mail, ArrowLeft } from "@lucide/svelte";
  import { goto } from "$app/navigation";
  import { toast } from "svoast";

  import { TextBox, repository } from "$lib";
  import { setSpinner } from "$lib/stores";

  let email: string = "";

  async function onSubmit(event: Event) {
    setSpinner({ active: true });

    await repository.auth.resetPassword(email);

    setSpinner({ active: false });

    toast.success("Enlace de recuperación enviado.");

    goto("/auth?action=signin", { replaceState: true } );
  }
</script>

<div class="container">
  <h1>Renti</h1>
  <span>Restablecer contraseña</span>
  <p>Ingresa tu correo y te enviaremos un enlace</p>
  <form action="" on:submit|preventDefault={onSubmit}>
    <TextBox
      bind:value={email}
      icon={Mail}
      type="email"
      placeholder="Correo electrónico"
      required
    />
    <button class="accent" type="submit">Enviar enlace</button>
  </form>
  <a href="/auth?action=signin">
    <ArrowLeft color="currentColor" />
    Volver al inicio
  </a>
</div>

<style lang="scss">
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    text-decoration: none;
    color: var(--color-text-medium);

    transition: color 0.2s ease-in-out;

    &:hover {
      color: var(--color-text-low);
    }
  }

  form {
    margin: 1.5rem 0;

    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > h1 {
      color: var(--color-accent);

      margin: 0;
    }

    & > span {
      font-weight: bold;
      font-size: 1.25rem;
    }

    & > p {
      color: var(--color-text-medium);
    }
  }
</style>
