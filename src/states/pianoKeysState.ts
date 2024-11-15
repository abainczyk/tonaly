import { atom } from "recoil";
import { PianoKey } from "../types/pianoKey.ts";
import { pianoKeys } from "./pianoKeys.ts";

export const pianoKeysState = atom<PianoKey[]>({
	key: "pianoKeys",
	default: pianoKeys,
});
