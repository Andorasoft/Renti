<script lang="ts">
  import { Toasts } from 'svoast';
</script>

<main>
  <section>
    <slot />
  </section>
  <Toasts position="top-right"/>
</main>

<style lang="scss">
  main {
    flex: 1;
    display: grid;
    place-items: center;

    padding: 2rem;
  }

  section {
    width: 100%;
    height: auto;
  }
</style>