<script lang="ts">
  import { ArrowLeft } from "@lucide/svelte";
  import { InputText } from "$lib";
  import { navigate } from "$lib/utils";
</script>

<form action="" autocomplete="off">
  <h2>Restablecer contraseña</h2>
  <p class="form-description">
    Ingresa tu correo electrónico y te enviaremos un enlace para crear una nueva
    contraseña
  </p>

  <strong class="label">Correo electrónico</strong>
  <InputText
    type="email"
    placeholder="Escribe tu correo electrónico"
    required
  />

  <button class="primary" type="submit">Enviar enlace</button>

  <a
    class="signin-link"
    href="/auth?action=signin"
    on:click|preventDefault={(e) => navigate(e, false)}
  >
    <ArrowLeft color="currentColor" />
    Volver al inicio de sesión
  </a>
</form>

<style lang="scss">
  form {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    padding: 2rem;
  }

  button {
    margin-top: 0.5rem;
  }

  p {
    color: var(--text-medium);
  }

  .label {
    margin-top: 0.75rem;
  }

  .form-description {
    margin-bottom: 1.5rem;
  }

  .signin-link {
    margin-top: 3rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
</style>
