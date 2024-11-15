import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/react";
import { AudioInputDeviceSelect } from "./AudioInputDeviceSelect.tsx";
import { FC } from "react";
import { PropsWithClassName } from "../types/propsWithClassName.ts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { usePrefixTranslation } from "../hooks/usePrefixTranslation.ts";
import { LanguageSelect } from "./LanguageSelect.tsx";
import { ThemeSelect } from "./ThemeSelect.tsx";
import { SensitivitySlider } from "./SensitivitySlider.tsx";
import { useRecoilValue } from "recoil";
import { microphonePermittedState } from "../states/microphoneState.ts";
import { Alert } from "./Alert.tsx";
import { DisplayDurationSelect } from "./DisplayDurationSelect.tsx";

export const SettingsDropdown: FC<PropsWithClassName> = ({ className }) => {
	const { t } = usePrefixTranslation("components.SettingsDropdown");
	const microphonePermitted = useRecoilValue(microphonePermittedState);

	return (
		<div className={className}>
			<Dropdown>
				<DropdownTrigger>
					<Button isIconOnly variant="flat">
						<MoreVertIcon fontSize="small" />
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Actions" className="max-w-[400px]">
					<DropdownSection title={t("recording")} showDivider>
						{microphonePermitted
							? [
									<DropdownItem
										isReadOnly
										key="audio-input-device"
										textValue={t("inputDevice")}
									>
										<AudioInputDeviceSelect />
									</DropdownItem>,
									<DropdownItem
										isReadOnly
										key="audio-input-device-sensivity"
										textValue={t("sensitivity")}
									>
										<SensitivitySlider />
									</DropdownItem>,
								]
							: [
									<DropdownItem
										isReadOnly
										key="audio-input-device"
										textValue={t("inputDevice")}
									>
										<Alert
											severity="warning"
											title={t("microphoneNotPermittedAlert.title")}
										>
											{t("microphoneNotPermittedAlert.description")}
										</Alert>
									</DropdownItem>,
								]}
					</DropdownSection>
					<DropdownSection title={t("behavior")} showDivider>
						<DropdownItem
							isReadOnly
							key="displayDuration"
							textValue={t("displayDuration")}
						>
							<DisplayDurationSelect />
						</DropdownItem>
					</DropdownSection>
					<DropdownSection title={t("application")}>
						<DropdownItem isReadOnly key="language" textValue={t("language")}>
							<LanguageSelect />
						</DropdownItem>
						<DropdownItem isReadOnly key="theme" textValue={t("theme")}>
							<ThemeSelect />
						</DropdownItem>
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};
