<script lang="ts">
	/**
	 * Path or URL to the Lottie animation file (JSON format).
	 *
	 * @example "/animations/success.json"
	 */
	export let src: string;

	/**
	 * Whether the animation should play automatically on load.
	 *
	 * @default true
	 */
	export let autoplay: boolean = true;

	/**
	 * Whether the animation should loop continuously.
	 *
	 * @default true
	 */
	export let loop: boolean = true;

	/**
	 * Background color of the animation canvas.
	 *
	 * @default "transparent"
	 * @example "#ffffff"
	 */
	export let background: string = 'transparent';

	/**
	 * Playback speed multiplier.
	 *
	 * @default 1
	 * @example 1.5
	 */
	export let speed: number = 1;

	/**
	 * Inline styles applied to the player element.
	 * Typically used to set width and height.
	 *
	 * @default "width: 150px; height: 150px;"
	 */
	export let style: string = 'width: 150px; height: 150px;';
</script>

<lottie-player {src} {autoplay} {loop} {background} {speed} {style}></lottie-player>
