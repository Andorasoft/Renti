<script lang="ts">
  import { FormPasswordReset, FormPasswordUpdate } from "$lib";

  export let data: { QUERY_TYPE: string; QUERY_TYPES: string[] };
</script>

<main>
  <section>
    {#if data.QUERY_TYPE === data.QUERY_TYPES[1]}
      <FormPasswordUpdate />
    {:else if data.QUERY_TYPE === data.QUERY_TYPES[0]}
      <FormPasswordReset />
    {/if}
  </section>
</main>

<style lang="scss">
  main {
    flex: 1;

    display: flex;
    flex-direction: column;
  }

  section {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
