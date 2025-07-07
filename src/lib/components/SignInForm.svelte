<script lang="ts">
  import { Mail, LockKeyhole } from "@lucide/svelte";
  import { goto } from "$app/navigation";
  import { toast } from "svoast";

  import { TextBox, repository } from "$lib";

  let email: string = "";
  let password: string = "";

  async function onSubmit(_: Event) {
    const { error } = await repository.auth.signIn(email, password);

    if (error) {
      toast.error("Credenciales incorrectas.");
    } else {
      goto("/");
    }
  }

  function onGoogleClick(_: Event): void {
    alert("Iniciar sesión con Google...");
  }

  function onAppleClick(_: Event): void {
    alert("Iniciar sesión con Apple...");
  }
</script>

<div class="container">
  <h1>Renti</h1>
  <span>Bienvenido de vuelta</span>
  <p>Gestiona fácilmente tus arriendos</p>
  <form action="" on:submit|preventDefault={onSubmit}>
    <TextBox
      icon={Mail}
      type="email"
      bind:value={email}
      placeholder="Correo electrónico"
      required
    />
    <TextBox
      icon={LockKeyhole}
      type="password"
      bind:value={password}
      placeholder="Contraseña"
      required
    />
    <a href="/auth/password_reset">¿Olvidaste tu contraseña?</a>
    <button class="accent" type="submit">Iniciar sesión</button>
  </form>
  <div class="separator">o</div>
  <button on:click={onGoogleClick}>
    <img class="icon" src="/icons/Google.svg" alt="" />
    Inicia sesión con Google
  </button>
  <button on:click={onAppleClick}>
    <img class="icon" src="/icons/Apple.svg" alt="" />
    Inicia sesión con Apple
  </button>
  <p style="margin-top: 2rem;">
    ¿No tienes una cuenta?
    <a href="?action=sign-up">Regístrate</a>
  </p>
</div>

<style lang="scss">
  form {
    margin: 1.5rem 0;

    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  a {
    align-self: flex-end;
    margin-bottom: 1rem;
  }

  .separator {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    margin-bottom: 1rem;

    color: var(--color-text-low);

    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background-color: var(--color-text-low);
      opacity: 0.3;
    }
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    text-align: center;

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
