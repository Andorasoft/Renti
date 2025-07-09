<script lang="ts">
  import { IdCard, UserRoundPen, Mail } from "@lucide/svelte";
  import type { AuthUser } from "@supabase/supabase-js";

  import { PhoneBox, repository, TextBox } from "$lib";
  import { capitalize } from "$lib/utils";

  export let data: { authUser: AuthUser | null };

  const userRoles = ["Propietario", "Inquilino"];
  let firstName: string = "Ricardo";
  let lastName: string = "";
  let id: string = "";
  let userType: string = "";

  async function onSignOut(event: Event) {
    await repository.auth.signOut();
  }
</script>

<main>
  <form>
    <section>
      <h2>Datos personales</h2>
      <p>Ingresa tu información básica para identificarte.</p>
      <img src="/avatars/Avatar-Boy_1.webp" alt="" />
      <input type="file" />
      <TextBox
        icon={UserRoundPen}
        type="text"
        placeholder="Nombre"
        bind:value={firstName}
        error="Hola"
        required
      />
      <TextBox
        icon={UserRoundPen}
        type="text"
        placeholder="Apellido"
        bind:value={lastName}
        required
      />
      <TextBox
        icon={IdCard}
        type="text"
        placeholder="Identificación"
        bind:value={id}
        required
      />
      <PhoneBox placeholder="Teléfono" />
    </section>
    <section>
      <h2>Cuenta</h2>
      <p>Crea tus credenciales de acceso.</p>
      <TextBox
        icon={Mail}
        type="text"
        placeholder="Correo electrónico"
        value={data.authUser?.email!!}
        disabled
        required
      />
    </section>
    <section>
      <h2>Tipo de cuenta</h2>
      <p>Selecciona el perfil que más se ajusta a ti.</p>
      <fieldset class="user-type">
        {#each userRoles as role}
          <label>
            <input
              type="radio"
              name="tipo"
              value={role}
              bind:group={userType}
              required
            />
            {capitalize(role)}
          </label>
        {/each}
      </fieldset>
    </section>
    <button class="accent" type="submit">Finalizar registro</button>
    <button type="button" on:click={onSignOut}>Cerrar sesión</button>
  </form>
</main>

<style lang="scss">
  main {
    flex: 1;
    background-color: #000;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  form {
    background-color: var(--bg-color);
    border-radius: 20pt 20pt 0 0;

    padding: 4rem 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  img {
    width: 8rem;
    height: 8rem;
  }
</style>
