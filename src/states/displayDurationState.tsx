import { atom } from "recoil";
import { localStorageEffect } from "./effects.ts";
import { DISPLAY_DURATION_KEY } from "../config/constants.ts";

const INFINITY = "Infinity";

export const displayDurationState = atom<number>({
	key: "displayDuration",
	default: Infinity,
	effects: [
		localStorageEffect(DISPLAY_DURATION_KEY, {
			serialize: (value) => (value === Infinity ? INFINITY : value.toString()),
			deserialize: (value) => (value === INFINITY ? Infinity : parseInt(value)),
		}),
	],
});
