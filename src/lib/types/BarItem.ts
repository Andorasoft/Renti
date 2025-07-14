/**
   * Represents a single navigation item in the bottom bar.
   */
export type BarItem = {
  /** Display title of the navigation item */
  label: string;

  /** Svelte component to render as icon */
  icon: string;

  /** Route path to navigate to */
  path: string;
};