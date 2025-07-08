<script lang="ts">
  import { spinner } from "$lib/stores";
  import type { CircleSpinner } from "$lib";

  let config: CircleSpinner;
  const unsubscribe = spinner.subscribe((l) => (config = l));
  import { onDestroy } from "svelte";
  onDestroy(unsubscribe);
</script>

{#if config.active}
  <div class="dismiss">
    <div
      class="circle"
      class:pause-animation={config.pause}
      style="--size: {config.size}{config.unit}; --colorInner: {config.colorInner}; --colorCenter: {config.colorCenter}; --colorOuter: {config.colorOuter}; --durationInner: {config.durationInner}; --durationCenter: {config.durationCenter}; --durationOuter: {config.durationOuter};"
    ></div>
  </div>
{/if}

<style>
  .dismiss {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: grid;
    place-items: center;
  }

  .circle {
    width: var(--size);
    height: var(--size);
    box-sizing: border-box;
    position: relative;
    border: 3px solid transparent;
    border-top-color: var(--colorOuter);
    border-radius: 50%;
    animation: circleSpin var(--durationOuter) linear infinite;
  }
  .circle::before,
  .circle::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border: 3px solid transparent;
    border-radius: 50%;
  }
  .circle::after {
    border-top-color: var(--colorInner);
    top: 9px;
    left: 9px;
    right: 9px;
    bottom: 9px;
    animation: circleSpin var(--durationInner) linear infinite;
  }
  .circle::before {
    border-top-color: var(--colorCenter);
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    animation: circleSpin var(--durationCenter) linear infinite;
  }
  .pause-animation,
  .pause-animation::after,
  .pause-animation::before {
    animation-play-state: paused;
  }

  @keyframes circleSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
