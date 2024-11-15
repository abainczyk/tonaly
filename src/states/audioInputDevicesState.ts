import { atom, selector } from "recoil";
import { localStorageEffect } from "./effects.ts";
import { DEVICE_SENSITIVITY_KEY } from "../config/constants.ts";

export interface AudioInputDevice {
	deviceId: string;
	label: string;
	selected: boolean;
}

export const audioInputDeviceSensitivityState = atom<number>({
	key: "audioInputDeviceSensitivity",
	default: 0.99,
	effects: [localStorageEffect(DEVICE_SENSITIVITY_KEY)],
});

export const audioInputDevicesState = atom<AudioInputDevice[]>({
	key: "audioInputDevices",
	default: [],
});

export const currentAudioInputDeviceState = selector<
	AudioInputDevice | undefined
>({
	key: "currentAudioInputDevice",
	get: ({ get }) => {
		const devices = get(audioInputDevicesState);
		return devices.find((device) => device.selected);
	},
});
