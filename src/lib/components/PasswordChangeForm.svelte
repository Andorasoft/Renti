<script lang="ts">
  import { LockKeyhole } from "@lucide/svelte";
  import { goto } from "$app/navigation";
  import { toast } from "svoast";

  import { TextBox, repository } from "$lib";
  import { setSpinner } from "$lib/stores";

  let newPassword: string = "";
  let confirmPassword: string = "";

  async function onSubmit(event: Event) {
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setSpinner({ active: true });

    const { error } = await repository.auth.updateUser({
      password: newPassword,
    });

    setSpinner({ active: false });

    if (error) {
      toast.error("Error al actualizar la contraseña: " + error.message);
      return;
    }

    toast.success("Contraseña actualizada correctamente.");
    goto("/auth?action=signin");
  }
</script>

<div class="container">
  <h1>Renti</h1>
  <span>Restablecer contraseña</span>
  <p>Ingresa tu nueva contraseña y confírmala para continuar.</p>
  <form action="" on:submit|preventDefault={onSubmit}>
    <TextBox
      bind:value={newPassword}
      icon={LockKeyhole}
      type="password"
      placeholder="Nueva contraseña"
      required
    />
    <TextBox
      bind:value={confirmPassword}
      icon={LockKeyhole}
      type="password"
      placeholder="Confirmar nueva contraseña"
      required
    />
    <button class="accent" type="submit">Restablecer contraseña</button>
  </form>
</div>

<style lang="scss">
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
