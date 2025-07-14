/**
 * Represents an individual action button to be displayed in the top bar of a page layout.
 *
 * This structure allows flexibility in rendering any component or icon as content,
 * along with accessibility features and optional reactivity through the `visible` flag.
 */
interface AppPageOptionItem {
  /**
   * Accessible label for screen readers and assistive technologies.
   * This value is used in the `aria-label` attribute of the button.
   *
   * @example "Go back"
   */
  label: string;

  /**
   * Svelte component or HTML element to render inside the button.
   * Common use cases include icon components or text labels.
   *
   * @example BackIcon, HelpIcon, or any custom component
   */
  content: any;

  /**
   * Determines whether this option should be rendered in the UI.
   * When set to `false`, the button will be hidden.
   *
   * @default true
   * @example
   * visible: false // Hides the button
   */
  visible?: boolean;

  /**
   * Optional click handler for the button.
   * Accepts a function with or without a MouseEvent parameter.
   *
   * @example
   * () => navigateTo('/home')
   * (event: MouseEvent) => doSomething(event)
   */
  onClick?: ((event: MouseEvent) => void) | (() => void);
}

/**
 * Defines the configuration object for top bar actions in a page layout.
 *
 * Each side of the top bar (`left` and `right`) can independently render an action button
 * with its own content, visibility, and click behavior.
 */
export interface AppPageOptions {
  /**
   * Action button to be displayed on the left side of the top bar.
   *
   * @example
   * {
   *   label: "Back",
   *   content: BackIcon,
   *   onClick: () => router.back()
   * }
   */
  left?: AppPageOptionItem;

  /**
   * Action button to be displayed on the right side of the top bar.
   *
   * @example
   * {
   *   label: "Help",
   *   content: HelpIcon,
   *   onClick: openHelpModal,
   *   visible: true
   * }
   */
  right?: AppPageOptionItem;
}
