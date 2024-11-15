import { Select, SelectItem } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import {
	audioInputDevicesState,
	currentAudioInputDeviceState,
} from "../states/audioInputDevicesState.ts";
import { useAudioInputDevicesState } from "../hooks/useAudioInputDevicesState.ts";
import { usePrefixTranslation } from "../hooks/usePrefixTranslation.ts";

export const AudioInputDeviceSelect = () => {
	const devices = useRecoilValue(audioInputDevicesState);
	const currentDevice = useRecoilValue(currentAudioInputDeviceState);
	const { selectAudioInputDevice } = useAudioInputDevicesState();
	const { t } = usePrefixTranslation("components.AudioInputDeviceSelect");

	return (
		<Select
			items={devices}
			selectedKeys={currentDevice?.deviceId ? [currentDevice.deviceId] : []}
			label={t("label")}
			aria-label={t("label")}
			placeholder={t("placeholder")}
			onSelectionChange={({ currentKey }) => selectAudioInputDevice(currentKey)}
		>
			{({ deviceId, label }) => (
				<SelectItem key={deviceId} aria-label={label}>
					{label}
				</SelectItem>
			)}
		</Select>
	);
};
