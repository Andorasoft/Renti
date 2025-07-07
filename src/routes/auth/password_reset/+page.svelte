<script lang="ts">
  import { PasswordResetForm, PasswordChangeForm } from "$lib";

  export let data: { type: string; types: string[] };
</script>

<div class="wrapper">
  <div class="forms">
    {#if data.type === data.types[1]}
      <PasswordResetForm />
    {:else if data.type === data.types[0]}
      <PasswordChangeForm />
    {/if}
  </div>
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
