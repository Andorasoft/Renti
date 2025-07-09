<!-- TextBox.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";

  /**
   * A flexible input component that optionally renders an icon,
   * supports validation and accessibility, and emits a submit event on Enter.
   */

  /**
   * Icon component (Svelte component class) to render inside the input.
   * @type {any | null}
   * @default null
   */
  export let icon: any | null = null;

  /**
   * Placeholder text shown when the input is empty.
   * Used also for aria-label accessibility.
   * @type {string}
   * @default ""
   */
  export let placeholder: string = "";

  /**
   * The value of the input field.
   * Supports two-way binding via `bind:value`.
   * @type {string}
   * @default ""
   */
  export let value: string = "";

  /**
   * Marks the input as required for form validation.
   * Maps to the native HTML `required` attribute.
   * @type {boolean}
   * @default false
   */
  export let required: boolean = false;

  /**
   * Disables the input and the entire label container.
   * Prevents user interaction.
   * @type {boolean}
   * @default false
   */
  export let disabled: boolean = false;

  /**
   * Makes the input readonly, allowing focus but no edits.
   * Maps to the native HTML `readonly` attribute.
   * @type {boolean}
   * @default false
   */
  export let readonly: boolean = false;

  /**
   * Defines the HTML input type attribute.
   * Allowed values: "text", "email", "password".
   * @type {"text" | "email" | "password"}
   * @default "text"
   */
  export let type: "text" | "email" | "password" = "text";

  /**
   * Unique ID for the input element.
   * Used for accessibility features such as `aria-describedby`.
   * Generated automatically if not provided.
   * @type {string}
   */
  export let id: string = crypto.randomUUID();

  /**
   * Optional error message string.
   * When present, input is marked invalid with aria-invalid="true" and
   * this message is displayed below the input.
   * @type {string | null}
   * @default null
   */
  export let error: string | null = null;

  /**
   * Svelte event dispatcher used to emit custom events.
   */
  const dispatch = createEventDispatcher();

  /**
   * Keyboard event handler.
   * Dispatches a `submit` event when the Enter key is pressed.
   *
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  function onKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      dispatch("submit", { value });
    }
  }
</script>

<label class:disabled>
  {#if icon}
    <!-- Render optional icon component with fixed size and placeholder color -->
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
    {readonly}
    bind:value
    aria-label={placeholder}
    aria-invalid={error ? "true" : "false"}
    aria-describedby={error ? `${id}-error` : undefined}
    {id}
    on:keydown={onKeydown}
  />
</label>

{#if error}
  <!-- Error message, linked to input via aria-describedby -->
  <p id="{id}-error" class="error-text" role="alert" aria-live="assertive">
    {error}
  </p>
{/if}

<style lang="scss">
  label {
    background-color: var(--color-input);
    border-radius: 25pt;
    padding: 0.5rem 1rem;
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
    flex: 1;

    height: 100%;

    &::placeholder {
      color: var(--color-text-placeholder);
    }

    &[aria-invalid="true"] {
      color: red;
    }
  }

  .error-text {
    color: var(--color-danger, red);
    font-size: 0.8rem;
    margin: 0.25rem 1rem 0 1rem;
  }
</style>
