import type { BarItem } from "./BarItem";

/**
 * Defines the event payload structure for this component.
 */
export type BottomBarEvent = {
  /**
   * Fired when a navigation item is selected.
   */
  select: { item: BarItem | null };
};