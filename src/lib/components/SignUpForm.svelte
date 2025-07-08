<script lang="ts">
  import { Mail, LockKeyhole, UserRoundPen } from "@lucide/svelte";
  import { goto } from "$app/navigation";
  import { onMount, tick } from "svelte";
  import { toast } from "svoast";

  import { TextBox, DatePicker, PhoneBox } from "$lib";
  import { UserRole, repository } from "$lib";
  import { capitalize } from "$lib/utils";
  import { setSpinner } from "$lib/stores";

  let nombre = "";
  let apellido = "";
  let fecha = "";
  let email = "";
  let password = "";
  let confirmar = "";
  let tipoUsuario = "";
  let codigoPais = "";
  let telefono = "";

  let userRoles: UserRole[] = [];

  onMount(async () => {
    userRoles = (await repository.userRole.getAll()).filter(
      (r) => r.name !== "admin",
    );
  });

  async function onSubmit(_: Event): Promise<void> {
    if (password !== confirmar) {
      toast.warning("Las contraseñas no coinciden.");
      return;
    }

    setSpinner({ active: true });

    const role = await repository.userRole.getByName(tipoUsuario);
    const country = (await repository.country.getAll()).find(
      (c) => c.phone_code === codigoPais,
    );

    if (!role || !country) {
      setSpinner({ active: false });

      toast.error("Algo salió mal de nuestro lado.");
      return;
    }

    const { error } = await repository.auth.signUp({
      email,
      password,
      first_name: nombre,
      last_name: apellido,
      identify_card: "",
      phone: telefono,
      role,
      country,
    });

    setSpinner({ active: false });

    if (error) {
      toast.error("Algo salió mal de nuestro lado.");
    } else {
      nombre = "";
      apellido = "";
      email = "";
      password = "";
      confirmar = "";
      tipoUsuario = "";
      telefono = "";

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
      <h2>Datos personales</h2>
      <p>Ingresa tu información básica para identificarte.</p>
      <TextBox
        icon={UserRoundPen}
        type="text"
        placeholder="Nombre"
        bind:value={nombre}
        required
      />
      <TextBox
        icon={UserRoundPen}
        type="text"
        placeholder="Apellido"
        bind:value={apellido}
        required
      />
      <DatePicker bind:date={fecha} />
      <PhoneBox
        placeholder="Teléfono"
        bind:code={codigoPais}
        bind:phone={telefono}
      />
    </section>

    <section class="form-section">
      <h2>Cuenta</h2>
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
        bind:value={confirmar}
        required
      />
    </section>

    <section class="form-section">
      <h2>Tipo de cuenta</h2>
      <p>Selecciona el perfil que más se ajusta a ti.</p>
      <fieldset class="user-type">
        {#each userRoles as role}
          <label>
            <input
              type="radio"
              name="tipo"
              value={role.name}
              bind:group={tipoUsuario}
              required
            />
            {capitalize(role.name)}
          </label>
        {/each}
      </fieldset>
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

  .user-type {
    border: none;
    outline: none;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & h1 {
      color: var(--color-accent);

      margin: 0;
    }

    & h2 {
      font-size: 1rem;
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
