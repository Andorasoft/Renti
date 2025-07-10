import { writable, readable } from "svelte/store";
import type { CircleSpinner } from "$lib";

const loader: CircleSpinner = {
  size: '60',
  unit: 'px',
  pause: false,
  active: false,
  color: "#000000",
  duration: "0",
  colorOuter: '#FF3E00',
  colorCenter: '#40B3FF',
  colorInner: '#676778',
  durationMultiplier: 1,
  durationOuter: '2s',
  durationInner: '1.5s',
  durationCenter: '3s'
};

export const spinner = writable<CircleSpinner>({ ...loader });

export function setSpinner(partial: Partial<CircleSpinner>) {
  spinner.update(s => ({ ...s, ...partial }));
}

export const screenWidth = readable(0, (set) => {
  if (typeof window === 'undefined') return;

  const update = () => set(window.innerWidth);

  update();
  window.addEventListener('resize', update);

  return () => window.removeEventListener('resize', update);
});
