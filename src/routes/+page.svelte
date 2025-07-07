<script lang="ts">
  import { MapPin, Menu, X } from "@lucide/svelte";
  import { repository, SearchBox } from "$lib";

  const name = "Ricardo";
  const location = "Riobamba, Ecuador";

  let isMenuOpen = false;

  function openMenu() {
    isMenuOpen = true;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  async function onSignOutClick(_: Event) {
    await repository.auth.signOut();
  }

  function handleSearch(event: CustomEvent<{ query: string }>): void {
    console.log(event.detail.query);
  }
</script>

<svelte:head>
  <meta name="theme-color" content="#000000" />
</svelte:head>
<header>
  <div class="card-user">
    <img class="card-picture" src="/images/R+E.png" alt="" />
    <div class="card-content">
      <h3>Hola, {name}</h3>
      <span>
        <MapPin size="16" />
        {location}
      </span>
    </div>
  </div>
  <button aria-label="Notificación" on:click={openMenu}>
    <Menu />
  </button>
  <nav class={`side-menu ${isMenuOpen ? "open" : ""}`}>
    <button aria-label="Cerrar" on:click={closeMenu}>
      <X />
    </button>
    <ul class="menu-list">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
    </ul>
  </nav>
</header>
<main>
  <SearchBox placeholder="Buscar..." on:search={handleSearch} />
  <button style="padding: 0 1rem;" on:click={onSignOutClick}>
    Cerrar sesión
  </button>
</main>

<style lang="scss">
  main {
    margin: 0 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  header {
    padding: 0 1rem;
    height: 6rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  button {
    min-width: 3rem;
    width: auto;
  }

  .card-user {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
  }

  .card-picture {
    border-radius: 100%;

    width: 3.25rem;
    height: 3.25rem;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    & span {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.25rem;

      font-size: 14px;
      color: #909090;
    }
  }

  .side-menu {
    background-color: var(--bg-color);

    padding: 1rem;
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    right: 0;

    transform: translateX(100%);
    transition: all 0.3s ease;

    &.open {
      transform: translateX(0);
    }
  }

  .menu-list {
    list-style: none;
  }
</style>
