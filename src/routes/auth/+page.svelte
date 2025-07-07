<script lang="ts">
  import { SignInForm, SignUpForm } from "$lib";

  export let data: { action: string; actions: string[] };
</script>

<div class="wrapper">
  <div class="none"></div>
  <div class="forms">
    {#if data.action === data.actions[1]}
      <SignUpForm />
    {:else if data.action === data.actions[0]}
      <SignInForm />
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

  .none {
    display: none;
  }

  .forms {
    width: 100%;
    height: auto;
  }
</style>
