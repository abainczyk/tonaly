import { first, remove, uniqBy } from "lodash";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
	AudioInputDevice,
	audioInputDevicesState,
} from "../states/audioInputDevicesState.ts";
import { FC, PropsWithChildren, useEffect } from "react";
import { microphonePermittedState } from "../states/microphoneState.ts";

export const AudioInputDevicesProvider: FC<PropsWithChildren> = ({
	children,
}) => {
	const setDevices = useSetRecoilState(audioInputDevicesState);
	const microphonePermitted = useRecoilValue(microphonePermittedState);

	useEffect(() => {
		loadAudioInputDevices();
	}, [microphonePermitted]);

	const loadAudioInputDevices = async () => {
		const { defaultDevice, devices } = await getAvailableAudioInputDevices();

		const audioInputDevices: AudioInputDevice[] = devices.map(
			({ deviceId, groupId, label }) => ({
				deviceId,
				label,
				selected: groupId === defaultDevice?.groupId,
			}),
		);

		setDevices(audioInputDevices);
	};

	return children;
};

async function getAvailableAudioInputDevices(): Promise<{
	defaultDevice?: MediaDeviceInfo;
	devices: MediaDeviceInfo[];
}> {
	try {
		if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
			throw new Error("MediaDevices API is not supported in this browser.");
		}

		const devices = await navigator.mediaDevices.enumerateDevices();
		const audioDevices = devices.filter(
			(device) => device.kind === "audioinput",
		);
		const uniqueAudioDevices = uniqBy(
			audioDevices,
			(device) => device.deviceId,
		);
		const defaultAudioDevice = first(
			remove(uniqueAudioDevices, (device) => device.deviceId === "default"),
		);

		return {
			defaultDevice: defaultAudioDevice,
			devices: uniqueAudioDevices,
		};
	} catch (error) {
		console.error("Error fetching input devices:", error);
		return {
			devices: [],
		};
	}
}
