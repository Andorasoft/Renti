<script lang="ts">
  import { Mail, LockKeyhole } from "@lucide/svelte";
  import { toast } from "svoast";

  import { TextBox, repository } from "$lib";
  import { setSpinner } from "$lib/stores";
  import { goto } from "$app/navigation";

  export let data: { action: string; actions: string[] };

  let email: string = "";
  let password: string = "";
  let confirmPassword: string = "";

  async function onLoginSubmit(event: Event) {
    setSpinner({ active: true });

    const { error } = await repository.auth.signIn(email, password);

    setSpinner({ active: false });

    console.log(error);

    if (error) {
      toast.error(
        error.message === "Email not confirmed"
          ? "¡Error! Debes confirmar tu correo electrónico."
          : "¡Error! Credenciales inválidas.",
      );
    }
  }

  async function onRegisterSubmit(event: Event): Promise<void> {
    if (password !== confirmPassword) {
      toast.warning("¡Error! Las contraseñas no coinciden.");
      return;
    }

    setSpinner({ active: true });

    const { error } = await repository.auth.signUp({
      email,
      password,
    });

    setSpinner({ active: false });

    email = "";
    password = "";
    confirmPassword = "";

    if (error) {
      toast.error("¡Error! Algo salió mal de nuestro lado.");
    } else {
      toast.success(
        "¡Felicidades! Te has registrado exitosamente, por favor verifica tu correo.",
      );

      goto("?action=sign-in", { replaceState: true });
    }
  }

  async function onGoogleSignIn(event: Event): Promise<void> {
    const { error } = await repository.auth.signInWithGoogle();

    if (error) {
      toast.error("Se produjo un error al acceder.");
    }
  }

  function onAppleSignIn(event: Event): void {
    alert("Iniciar sesión con Apple...");
  }
</script>

<svelte:head>
  <title>Renti | Accede a tu cuenta</title>
</svelte:head>
<main>
  <div class="hero"></div>
  <div class="forms">
    <h1>Renti</h1>
    {#if data.action === data.actions[1]}
      <span>Registrate hoy ¡Gratis!</span>

      <p>Crea tus credenciales de acceso.</p>

      <form action="" on:submit|preventDefault={onRegisterSubmit}>
        <TextBox
          icon={Mail}
          type="email"
          placeholder="Correo electrónico"
          bind:value={email}
          required
        />

        <TextBox
          icon={LockKeyhole}
          type="password"
          placeholder="Contraseña"
          bind:value={password}
          required
        />

        <TextBox
          icon={LockKeyhole}
          type="password"
          placeholder="Confirmar contraseña"
          bind:value={confirmPassword}
          required
        />

        <button type="submit" class="accent">Registrarse</button>
      </form>
    {:else}
      <span>Bienvenido de vuelta</span>

      <p>Gestiona fácilmente tus arriendos</p>

      <form action="" on:submit|preventDefault={onLoginSubmit}>
        <TextBox
          icon={Mail}
          type="email"
          placeholder="Correo electrónico"
          bind:value={email}
          required
        />

        <TextBox
          icon={LockKeyhole}
          type="password"
          placeholder="Contraseña"
          bind:value={password}
          required
        />

        <a href="/auth/password_reset">¿Olvidaste tu contraseña?</a>

        <button class="accent" type="submit">Iniciar sesión</button>

        <div class="separator">o</div>

        <button type="button" on:click={onGoogleSignIn}>
          <img class="icon" src="/icons/Google.svg" alt="" />
          Acceder con Google
        </button>

        <button type="button" on:click={onAppleSignIn} disabled>
          <img class="icon" src="/icons/Apple.svg" alt="" />
          Acceder con Apple
        </button>
      </form>
    {/if}
    <p>
      {#if data.action === data.actions[1]}
        ¿Ya tienes una cuenta?
        <a href="?action=sign-in">Inicia sesión</a>
      {:else}
        ¿No tienes una cuenta?
        <a href="?action=sign-up">Regístrate</a>
      {/if}
    </p>
  </div>
</main>

<style lang="scss">
  main {
    flex: 1;

    display: grid;
    place-items: center;

    & .hero {
      display: none;
    }

    & .forms {
      padding: 2rem;
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      text-align: center;
    }
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin: 0.5rem 0 2rem 0;
    width: 100%;

    & > a {
      margin-bottom: 1rem;
    }
  }

  span {
    font-weight: bold;
  }

  p {
    &:first-of-type {
      color: var(--color-text-medium);
    }
  }

  a {
    text-align: end;
  }

  h1 {
    font-weight: bolder;
    font-size: 2.25rem;
    color: var(--color-accent);

    margin: 0;
  }

  .separator {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    margin: 1rem 0;

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
</style>
