<script lang="ts">
  import { IdCard, UserRoundPen, Mail } from "@lucide/svelte";
  import { PhoneBox, TextBox } from "$lib";

  let email: string = "adammikesb@gmail.com";
  let firstName: string = "";
  let lastName: string = "";
  let id: string = "";
</script>

<main>
  <form>
    <img src="/avatars/Avatar-Boy_1.webp" alt="" />
    <input type="file" />
    <TextBox
      icon={UserRoundPen}
      type="text"
      placeholder="Nombre"
      bind:value={firstName}
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
    <TextBox
      icon={Mail}
      type="text"
      placeholder="Correo electrónico"
      bind:value={email}
      disabled
      required
    />
    <select>
      <option value="1">Propietario</option>
      <option value="2">Inquilino</option>
    </select>
    <button class="accent" type="submit">Finalizar registro</button>
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
