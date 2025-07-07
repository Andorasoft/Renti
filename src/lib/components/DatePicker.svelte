<script lang="ts">
  import { CalendarDays } from "@lucide/svelte";
  import { createEventDispatcher } from "svelte";

  export let date: any = "";
  let dateInput: HTMLInputElement;

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
      dispatch("submit", { text: date });
    }
  }

  function onClick(_: Event): void {
    dateInput?.showPicker();
  }
</script>

<label for="text-input" class="text-box">
  <button class="button" on:click={onClick}>
    <CalendarDays size="20" color="var(--color-text-placeholder)" />
  </button>
  <input
    bind:this={dateInput}
    type="date"
    bind:value={date}
    aria-label="Fecha"
    on:keydown={onKeydown}
  />
</label>

<style lang="scss">
  .button {
    background-color: transparent;
    border-radius: 0;

    padding: 0;
    width: auto;
    height: auto;
    min-height: 0;
  }

  .text-box {
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

    & input {
      background-color: transparent;
      border: none;
      outline: none;

      flex-grow: 1;

      &[type="date"]::-webkit-calendar-picker-indicator {
        opacity: 0;
        pointer-events: none;
      }

      &::placeholder {
        color: var(--color-text-placeholder);
      }
    }

    &:hover {
      background-color: var(--color-input-hover);
    }
  }
</style>
