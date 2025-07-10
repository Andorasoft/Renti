<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { FullAutoFill } from "svelte/elements";
  import { CircleX, EyeOff, Eye } from "@lucide/svelte";
  import { nanoid } from "nanoid";

  export let id: string = nanoid(12);

  export let value: any = null;

  export let placeholder: string = "";

  export let required: boolean = false;

  export let disabled: boolean = false;

  export let readonly: boolean = false;

  export let error: string | null = null;

  export let name: string | null = null;

  export let autocomplete: FullAutoFill | null = null;

  export let type: "text" | "email" | "password" = "text";

  let showPassword: boolean = false;

  let focused: boolean = false;

  let icon: any = null;

  $: effectiveType = type === "password" && showPassword ? "text" : type;

  $: iconToRender =
    icon ??
    (type === "password"
      ? showPassword
        ? EyeOff
        : Eye
      : focused && value
        ? CircleX
        : null);

  const dispatch = createEventDispatcher();

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      dispatch("submit", { value });
    }
  }

  function handleFocus(event: FocusEvent): void {
    focused = true;
  }

  function handleBlur(event: FocusEvent): void {
    focused = false;
  }

  function handleIconClick(event: MouseEvent): void {
    if (type === "password") {
      showPassword = !showPassword;
    } else {
      value = null;
    }
  }
</script>

<div class="form-control">
  <label for={id} class:disabled class:focused>
    <input
      {id}
      {placeholder}
      {required}
      {disabled}
      {readonly}
      {name}
      {autocomplete}
      bind:value
      type={effectiveType}
      aria-label={placeholder}
      aria-invalid={!error}
      aria-describedby={error ? `${id}-error` : undefined}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:keydown={handleKeydown}
    />
    {#if iconToRender}
      <button
        type="button"
        tabindex="-1"
        on:mousedown|preventDefault
        on:click={handleIconClick}
      >
        <svelte:component
          this={iconToRender}
          size="24"
          color="var(--color-placeholder)"
        />
      </button>
    {:else}{/if}
  </label>
  {#if error}
    <!-- Error message, linked to input via aria-describedby -->
    <p id="{id}-error" class="error-text" role="alert" aria-live="assertive">
      <img src="/icons/Error.svg" alt="" />
      {error}
    </p>
  {/if}
</div>

<style lang="scss">
  div.form-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;

    padding: 0 0.75rem;
    height: 3rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: var(--hover-input);
    }
  }

  input {
    background: none;
    border: none;
    outline: none;

    flex: 1;
  }

  button {
    background-color: transparent;
    border: none;
    border-radius: 0;

    min-width: 0;
    min-height: 0;

    width: auto;
    height: auto;

    display: grid;
    place-items: center;
  }

  p {
    color: var(--color-error);

    display: flex;
    align-items: center;
    gap: 0.5rem;

    & img {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
</style>
