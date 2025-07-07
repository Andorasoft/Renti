<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { Country } from "$lib/models";
  import { isoToEmoji } from "$lib/utils";
  import { repository } from "$lib";

  /**
   * `PhoneBox` Component
   *
   * A reusable input for phone numbers with a country code selector.
   * Emits a `submit` event when the user presses Enter, including the selected country code and the typed phone number.
   */

  /**
   * Placeholder text displayed inside the phone input field.
   * @type {string}
   */
  export let placeholder: string = "";

  /**
   * Initial phone number value (not bound to input).
   * @type {string}
   */
  export let phone: string = "";

  /**
   * Country calling code (e.g. "+1", "+593").
   * Defaults to the first country code in the loaded list.
   * @type {string}
   */
  export let code: string = "";

  /**
   * List of available countries fetched from the repository.
   * @type {Country[]}
   */
  let countries: Country[] = [];

  /**
   * Loads country list on component mount and sets default code.
   */
  onMount(async () => {
    countries = await repository.country.getAll();

    if (countries.length > 0) {
      code = countries[0].phone_code;
    }
  });

  /**
   * Dispatches custom component events.
   *
   * @event submit
   * @property {Object} detail - Event payload
   * @property {string} detail.code - Selected country phone code
   * @property {string} detail.phone - Phone number entered by the user
   */
  const dispatch = createEventDispatcher();

  /**
   * Handles keydown events.
   * Dispatches `submit` event if Enter key is pressed.
   *
   * @param {KeyboardEvent} event - The keyboard event
   */
  function onKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      dispatch("submit", { code, phone });
    }
  }
</script>

<!-- Phone input with country code selector -->
<label class="phone-box">
  <select bind:value={code}>
    {#each countries as country}
      <option value={country.phone_code}>
        {isoToEmoji(country.iso2)} {country.phone_code}
      </option>
    {/each}
  </select>

  <input
    type="tel"
    {placeholder}
    bind:value={phone}
    on:keydown={onKeydown}
  />
</label>

<style lang="scss">
  $transition: background-color 0.2s ease-in-out;

  .phone-box {
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

    transition: $transition;

    & select {
      background-color: transparent;
      border: none;
      outline: none;
      width: auto;
    }

    & input {
      background-color: transparent;
      border: none;
      outline: none;
      flex-grow: 1;

      &::placeholder {
        color: var(--color-text-placeholder);
      }
    }

    &:hover {
      background-color: var(--color-input-hover);
    }
  }
</style>