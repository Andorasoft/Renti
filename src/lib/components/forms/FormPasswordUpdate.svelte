<script lang="ts">
  import { InputText } from "$lib";
</script>

<form action="" autocomplete="off">
  <h2>Actualizar contraseña</h2>
  <p class="form-description">
    Escribe tu nueva contraseña y confírmala para completar el proceso
  </p>

  <strong class="label">Nueva contraseña</strong>
  <InputText
    type="password"
    placeholder="Ingresa una contraseña segura"
    required
  />

  <strong class="label">Confirmar nueva contraseña</strong>
  <InputText
    type="password"
    placeholder="Vuelve a escribir la contraseña"
    required
  />

  <button class="primary" type="submit">Guardar contraseña</button>
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
    margin-top: 1.5rem;
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
</style>
