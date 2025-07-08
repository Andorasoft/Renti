<script lang="ts">
  import { Mail, LockKeyhole } from "@lucide/svelte";
  import { goto } from "$app/navigation";
  import { toast } from "svoast";

  import { setSpinner } from "$lib/stores";
  import { repository } from "$lib";
  import { TextBox } from "$lib";

  let email = "";
  let password = "";
  let confirmPassword = "";

  async function onSubmit(_: Event): Promise<void> {
    if (password !== confirmPassword) {
      toast.warning("Las contraseñas no coinciden.");
      return;
    }

    setSpinner({ active: true });

    const { error } = await repository.auth.signUp({
      email,
      password,
    });

    setSpinner({ active: false });

    if (error) {
      toast.error("Algo salió mal de nuestro lado.");
    } else {
      email = "";
      password = "";
      confirmPassword = "";

      toast.success("Te has registrado exitosamente, verifica tu correo.");

      goto("?action=sign-in", { replaceState: true });
    }
  }
</script>

<div class="container">
  <h1>Renti</h1>
  <span>¡Crea tu cuenta gratis!</span>

  <form action="" on:submit|preventDefault={onSubmit}>
    <section class="form-section">
      <p>Crea tus credenciales de acceso.</p>
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
    </section>
    <button type="submit" class="accent">Registrarse</button>
  </form>
  <p style="margin-top: 2rem; text-align: center;">
    ¿Ya tienes una cuenta?
    <a href="?action=sign-in">Inicia sesión</a>
  </p>
</div>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & h1 {
      color: var(--color-accent);

      margin: 0;
    }

    & span {
      font-weight: bold;
      font-size: 1.25rem;

      margin-bottom: 1rem;
    }

    & p {
      color: var(--color-text-medium);
    }
  }
</style>
