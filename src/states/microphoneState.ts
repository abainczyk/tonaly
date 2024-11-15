import { atom } from "recoil";

export const microphoneSupportedState = atom<boolean>({
	key: "microphoneSupported",
	default: false,
});

export const microphonePermittedState = atom<boolean>({
	key: "microphonePermitted",
	default: false,
});
