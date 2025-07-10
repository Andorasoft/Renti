<script lang="ts">
  import { nanoid } from "nanoid";

  export let id: string = nanoid(12);

  export let checked: boolean = null;

  export let required: boolean = false;

  export let disabled: boolean = false;

  export let readonly: boolean = false;

  export let name: string | null = null;
</script>

<div class="form-control">
  <label for={id}>
    <input
      {id}
      {required}
      {disabled}
      {readonly}
      {name}
      bind:checked
      type="checkbox"
      aria-label="Checkbox"
    />
    <slot />
  </label>
</div>

<style lang="scss">
  div.form-control {
    padding: 0.25rem 0;
    width: 100%;
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    background-color: var(--color-surface);
    border-radius: 0.25rem;
    border: 1px solid var(--text-placeholder);

    width: 20px;
    height: 20px;

    cursor: pointer;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  input[type="checkbox"]:checked {
    background-color: #3b82f6;
    border: none;
  }

  input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 20px;
    height: 20px;

    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><path d='M20 6 9 17l-5-5'/></svg>");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 14px 14px;
  }

  input[type="checkbox"]:hover {
    border-color: var(--color-low);
  }
</style>
