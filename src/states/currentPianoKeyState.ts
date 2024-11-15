import { atom } from "recoil";

import { PianoKey } from "../types/pianoKey.ts";

export const currentPianoKeyState = atom<PianoKey | undefined>({
	key: "currentPianoKey",
	default: undefined,
});
