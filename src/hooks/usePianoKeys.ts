import { PianoKey } from "../types/pianoKey.ts";
import { useRecoilValue } from "recoil";
import { pianoKeysState } from "../states/pianoKeysState.ts";

export const usePianoKeys = () => {
	const pianoKeys = useRecoilValue(pianoKeysState);

	return {
		pianoKeys,
		findClosestPianoKey: (frequency: number) =>
			pianoKeys.reduce((closest, current) =>
				Math.abs(current.frequency - frequency) <
				Math.abs(closest.frequency - frequency)
					? current
					: closest,
			),
		getPianoKeyWindow: (key: PianoKey, n: number): PianoKey[] => {
			const windowSize = n * 2 + 1;
			const window = Array(windowSize);

			if (key == null) {
				return window;
			}

			const index = pianoKeys.findIndex((k) => k.note === key.note);
			if (index === -1) return []; // Return an empty array if the key is not found

			for (let i = 0; i < windowSize; i++) {
				window[i] = pianoKeys[index - n + i];
			}

			return window;
		},
	};
};
