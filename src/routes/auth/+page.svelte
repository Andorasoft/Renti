<script lang="ts">
  import { page } from '$app/state';
  import { setContext } from 'svelte';

  let action = $state(page.url.searchParams.get("action"));
  console.log(setContext('action', () => action));
</script>

<div class="wrapper">
  <div class="none"></div>
  <div class="forms"></div>
</div>

<style lang="scss">
  .wrapper {
    flex: 1;
    display: grid;
    place-items: center;

    padding: 2rem;
  }

  .forms {
    width: 100%;
    height: auto;
  }
</style>
