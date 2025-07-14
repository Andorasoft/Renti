/**
 * Defines the labeling behavior for navigation items in the bottom bar.
 */
export type BarItemLabelMode =
  /**
   * All items display their text labels regardless of selection state.
   */
  | 'labeled'

  /**
   * No items display text labels; only icons are shown.
   */
  | 'unlabeled';