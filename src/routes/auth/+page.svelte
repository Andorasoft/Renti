<script lang="ts">
  import { fly } from "svelte/transition";

  import { FormSignIn, FormSignUp } from "$lib";
  import { screenWidth } from "$lib/stores";

  export let data: { QUERY_ACTION: string; QUERY_ACTIONS: string[] };

  $: width = $screenWidth;
</script>

<main>
  <section></section>
  <section>
    {#if data.QUERY_ACTION === data.QUERY_ACTIONS[1]}
      <div
        in:fly={{ x: -width, duration: 300 }}
        out:fly={{ x: -width, duration: 300 }}
      >
        <FormSignUp />
      </div>
    {:else if data.QUERY_ACTION === data.QUERY_ACTIONS[0]}
      <div
        in:fly={{ x: width, duration: 300 }}
        out:fly={{ x: width, duration: 300 }}
      >
        <FormSignIn />
      </div>
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

    &:first-of-type {
      display: none;
    }

    &:last-of-type {
      display: flex;
      flex-direction: column;
      justify-content: center;

      position: relative;
    }

    & > div {
      position: absolute;
      inset: 0;

      display: flex;
      flex-direction: column;
    }
  }
</style>
