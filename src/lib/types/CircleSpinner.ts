import type { Spinner } from "./Spinner";

export type CircleSpinner = {
	colorOuter: string;
	colorCenter: string;
	colorInner: string;
	durationMultiplier: number;
	durationOuter: string;
	durationInner: string;
	durationCenter: string;
} & Spinner;