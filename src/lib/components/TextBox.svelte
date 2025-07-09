<script lang="ts">
  import { createEventDispatcher } from "svelte";

  /**
   * `TextBox` Component
   *
   * A flexible input component that can optionally render an icon and emits
   * a `submit` event when the user presses Enter.
   */

  /**
   * Optional icon component to render at the beginning of the input.
   * It must be a Svelte component (e.g. from Lucide or custom).
   * @type {any|null}
   */
  export let icon: any | null = null;

  /**
   * Placeholder text shown inside the input field.
   * @type {string}
   */
  export let placeholder: string = "";

  /**
   * The input type (e.g. "text", "email", "password").
   * Defaults to `"text"`.
   * @type {"text" | "email" | "password"}
   */
  export let type: "text" | "email" | "password" = "text";

  /**
   * The bound value of the input field.
   * Supports two-way binding via `bind:value`.
   * @type {any}
   */
  export let value: any = "";

  /**
   * Whether the input is required for form validation.
   * When set to `true`, the input must be filled before submitting.
   * Maps to the native HTML `required` attribute.
   * @type {boolean}
   */
  export let required: boolean = false;

  export let disabled: boolean = false;

  /**
   * Dispatches custom component events.
   *
   * @event submit
   * @property {Object} detail
   * @property {string} detail.text - The current value of the input field
   */
  const dispatch = createEventDispatcher();

  /**
   * Handles keydown events.
   * If the key is Enter, dispatches the `submit` event.
   *
   * @param {KeyboardEvent} event - The keyboard event
   */
  function onKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      dispatch("submit", { text: value });
    }
  }
</script>

<label class:disabled>
  {#if icon}
    <svelte:component
      this={icon}
      size="20"
      color="var(--color-text-placeholder)"
    />
  {/if}
  <input
    {type}
    {placeholder}
    {required}
    {disabled}
    bind:value
    aria-label={placeholder}
    on:keydown={onKeydown}
  />
</label>

<style lang="scss">
  label {
    background-color: var(--color-input);
    border-radius: 25pt;

    padding: 0.25rem 1rem;
    width: 100%;
    height: 3rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;
    gap: 0.5rem;

    transition: background-color 0.2s ease-in-out;

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      user-select: none;
    }

    &:hover {
      background-color: var(--color-input-hover);
    }
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;

    flex-grow: 1;

    &::placeholder {
      color: var(--color-text-placeholder);
    }
  }
</style>
