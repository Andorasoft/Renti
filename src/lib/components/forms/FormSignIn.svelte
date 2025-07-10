<script lang="ts">
  import { InputText } from "$lib";
  import { navigate } from "$lib/utils";
</script>

<form action="" autocomplete="on">
  <h2>Inicia sesión</h2>
  <p class="form-description">
    Inicia sesión para acceder a tu cuenta y gestionar todo desde un solo lugar
  </p>

  <strong class="label">Correo electrónico</strong>
  <InputText
    type="email"
    placeholder="Ingresa tu correo electrónico"
    autocomplete="email"
    required
  />

  <strong class="label">Contraseña</strong>
  <InputText
    type="password"
    placeholder="Ingresa tu contraseña"
    autocomplete="current-password"
    required
  />

  <a
    href="/auth/password?type=reset"
    on:click|preventDefault={(e) => navigate(e, false)}
  >
    ¿Olvidaste tu contraseña?
  </a>

  <button type="submit" class="primary">Iniciar sesión</button>

  <span>o continúa con</span>

  <div class="wrapper">
    <button>
      <img class="icon" src="/icons/Facebook.svg" alt="Icono" />
      Facebook
    </button>
    <button>
      <img class="icon" src="/icons/Google.svg" alt="Icono" />
      Google
    </button>
  </div>

  <p class="signup-link">
    ¿Aún no tienes cuenta?
    <a href="?action=signup" on:click|preventDefault={(e) => navigate(e, true)}>
      Crea una gratis
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

    & > a {
      margin-bottom: 1.5rem;
    }
  }

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    margin: 1rem 0;

    color: var(--text-medium);

    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background-color: var(--color-placeholder);
      opacity: 0.3;
    }
  }

  p {
    color: var(--text-medium);
  }

  a {
    text-align: end;
  }

  .form-description {
    margin-bottom: 1.5rem;
  }

  .label {
    margin-top: 0.75rem;
  }

  .signup-link {
    margin-top: 3rem;

    text-align: center;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    & > button {
      flex: 1;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
</style>
