import { atom, selector } from "recoil";
import { roundToDecimals } from "../utils/mathUtils.ts";

export const currentPitchState = atom<number | undefined>({
	key: "currentPitch",
	default: undefined,
});

export const currentRoundedPitchState = selector<number | undefined>({
	key: "currentRoundedPitch",
	get: ({ get }) => {
		const pitch = get(currentPitchState);
		return pitch && roundToDecimals(pitch, 1);
	},
});
