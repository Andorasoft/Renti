<script lang="ts">
  import { Search, CornerDownLeft } from "@lucide/svelte";
  import { createEventDispatcher } from "svelte";

  /**
   * `SearchBox` Component
   *
   * A reusable search input with a leading icon and a submit button.
   * Emits a `search` event when the user presses Enter or clicks the submit button.
   * The event includes the current input value as a query string.
   */

  /**
   * Placeholder text displayed inside the input field.
   * @type {string}
   */
  export let placeholder: string = "";

  /**
   * The current value of the input field.
   * Bound bidirectionally to the `<input>` element.
   * @type {string}
   */
  let value: string = "";

  /**
   * Dispatches custom events from the component.
   *
   * @event search
   * @property {Object} detail - Event payload
   * @property {string} detail.query - The current search query entered by the user
   */
  const dispatch = createEventDispatcher();

  /**
   * Handles the `keydown` event on the input field.
   * If the pressed key is Enter, dispatches the `search` event.
   *
   * @param {KeyboardEvent} event - The keyboard event
   */
  function onKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      dispatch("search", { query: value });
    }
  }

  /**
   * Handles the click event on the submit button.
   * Dispatches the `search` event with the current input value.
   *
   * @param {Event} _ - The click event (unused)
   */
  function onClick(_: Event): void {
    dispatch("search", { query: value });
  }
</script>

<label for="search-input" class="search-box">
  <Search size="20" color="#757575" />
  <input
    id="search-input"
    type="text"
    {placeholder}
    bind:value
    on:keydown={onKeydown}
  />
  <button aria-label="Buscar" on:click={onClick}>
    <CornerDownLeft color="#ffffff" />
  </button>
</label>

<style lang="scss">
  $transition: background-color 0.2s ease-in-out;

  .search-box {
    background-color: #dfe5ec;
    border-radius: 25pt;

    padding: 0.25rem 0.25rem 0.25rem 1rem;
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;
    gap: 0.5rem;

    transition: $transition;

    & input {
      background-color: transparent;
      border: none;
      outline: none;

      flex-grow: 1;
    }

    & button {
      background-color: var(--accent-color);
      border-radius: 100%;
      border: none;

      width: 2.5rem;
      height: 2.5rem;

      display: grid;
      place-items: center;

      transition: $transition;

      &:hover {
        background-color: var(--accent-color-dark1);
      }
    }

    &:hover {
      background-color: #ced3d9;
    }
  }
</style>
