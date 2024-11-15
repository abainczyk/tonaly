import { Slider } from "@nextui-org/react";
import { useAudioInputDevicesState } from "../hooks/useAudioInputDevicesState.ts";
import { usePrefixTranslation } from "../hooks/usePrefixTranslation.ts";

export const SensitivitySlider = () => {
	const { scaledSensitivity, updateSensitivity } = useAudioInputDevicesState();
	const { t } = usePrefixTranslation("components.SettingsDropdown");

	const handleSensitivityChange = (sensitivity: number | number[]) => {
		if (!Array.isArray(sensitivity)) {
			updateSensitivity(sensitivity);
		}
	};

	return (
		<div className="bg-gray-100 dark:bg-zinc-800 dark:text-white rounded-xl py-2 px-3">
			<Slider
				label={t("sensitivity")}
				aria-label={t("sensitivity")}
				step={1}
				maxValue={10}
				minValue={1}
				value={scaledSensitivity}
				onChange={handleSensitivityChange}
			/>
		</div>
	);
};
