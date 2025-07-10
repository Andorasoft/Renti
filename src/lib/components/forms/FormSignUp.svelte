<script lang="ts">
  import { InputCheckbox, InputText } from "$lib";
  import { navigate } from "$lib/utils";
</script>

<form action="" autocomplete="off">
  <h2>Crear cuenta</h2>
  <p class="form-description">
    Regístrate para comenzar a gestionar tus propiedades y alquileres
  </p>

  <strong class="label">Correo electrónico</strong>
  <InputText
    type="email"
    placeholder="Escribe tu correo electrónico"
    required
  />

  <strong class="label">Contraseña</strong>
  <InputText
    type="password"
    placeholder="Crea una contraseña segura"
    required
  />

  <strong class="label">Confirmar contraseña</strong>
  <InputText type="password" placeholder="Repite la contraseña" required />

  <InputCheckbox>
    <p>
      Acepto los
      <a
        href="/terms-and-privacy"
        on:click|preventDefault={(e) => navigate(e, false)}
      >
        términos y condiciones
      </a>
    </p>
  </InputCheckbox>

  <button type="submit" class="primary">Crear cuenta</button>

  <p class="signin-link">
    ¿Ya tienes una cuenta?
    <a href="?action=signin" on:click|preventDefault={(e) => navigate(e, true)}>
      Inicia sesión
    </a>
  </p>
</form>

<style lang="scss">
  form {
    flex: 1;

    background-color: var(--color-background);

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    padding: 2rem;
  }

  button {
    margin-top: 1.5rem;
  }

  p {
    color: var(--text-medium);
  }

  .form-description {
    margin-bottom: 1.5rem;
  }

  .label {
    margin-top: 0.75rem;
  }

  .signin-link {
    margin-top: 3rem;

    text-align: center;
  }
</style>
