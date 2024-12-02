import { Sampler } from "tone";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPianoKeyState } from "../states/currentPianoKeyState.ts";
import { useState } from "react";
import { currentPitchState } from "../states/currentPitchState.ts";
import { PianoKey } from "../types/pianoKey.ts";
import { displayDurationState } from "../states/displayDurationState.tsx";
import { BASE_URL } from "../config/environments.ts";

const sampler = new Sampler({
	urls: {
		C1: "C1.mp3",
		C2: "C2.mp3",
		C3: "C3.mp3",
		C4: "C4.mp3",
		C5: "C5.mp3",
		C6: "C6.mp3",
		C7: "C7.mp3",
		C8: "C8.mp3",
	},
	release: 1,
	baseUrl: `${BASE_URL === "/" ? "" : BASE_URL}/audio/`,
}).toDestination();

export const usePlayer = () => {
	const setCurrentPianoKey = useSetRecoilState(currentPianoKeyState);
	const setCurrentPitch = useSetRecoilState(currentPitchState);
	const displayDuration = useRecoilValue(displayDurationState);
	const [timeout, setTimeout] = useState<number | undefined>();

	return {
		play: (key: PianoKey) => {
			if (timeout != null) {
				window.clearTimeout(timeout);
				setTimeout(undefined);
			}

			sampler.triggerAttackRelease([key.note], 1);
			setCurrentPianoKey(key);
			setCurrentPitch(key.frequency);

			if (displayDuration != Infinity) {
				setTimeout(
					window.setTimeout(() => {
						setCurrentPianoKey(undefined);
						setCurrentPitch(undefined);
					}, displayDuration),
				);
			}
		},
	};
};
