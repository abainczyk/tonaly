import {
	audioInputDeviceSensitivityState,
	audioInputDevicesState,
} from "../states/audioInputDevicesState.ts";
import { useRecoilState } from "recoil";

export const useAudioInputDevicesState = () => {
	const [devices, setDevices] = useRecoilState(audioInputDevicesState);
	const [sensitivity, setSensitivity] = useRecoilState(
		audioInputDeviceSensitivityState,
	);

	return {
		scaledSensitivity: 99 - 100 * sensitivity,
		selectAudioInputDevice: (newDeviceId?: string) => {
			if (newDeviceId == null) {
				return;
			}

			const updatedDevices = devices.map((device) => ({
				...device,
				selected: device.deviceId === newDeviceId,
			}));

			setDevices(updatedDevices);
		},
		updateSensitivity: (sensitivity: number) => {
			const updatedSensitivity = (99 - sensitivity) / 100;
			setSensitivity(updatedSensitivity);
		},
	};
};
