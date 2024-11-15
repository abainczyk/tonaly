import { useSetRecoilState } from "recoil";
import { FC, PropsWithChildren, useEffect } from "react";
import {
	microphonePermittedState,
	microphoneSupportedState,
} from "../states/microphoneState.ts";
import {
	checkMicrophonePermitted,
	checkMicrophoneSupported,
	getMicrophonePermissionStatus,
} from "../utils/mediaUtils.ts";

export const MicrophoneStateProvider: FC<PropsWithChildren> = ({
	children,
}) => {
	const setMicrophoneSupported = useSetRecoilState(microphoneSupportedState);
	const setMicrophonePermitted = useSetRecoilState(microphonePermittedState);

	useEffect(() => {
		let permissionStatus: PermissionStatus;

		const handlePermissionStatusChange = async () => {
			setMicrophonePermitted(await checkMicrophonePermitted());
		};

		const loadPermissions = async () => {
			setMicrophoneSupported(await checkMicrophoneSupported());
			permissionStatus = await getMicrophonePermissionStatus();
			if (await checkMicrophonePermitted()) {
				setMicrophonePermitted(true);
			} else {
				permissionStatus.addEventListener(
					"change",
					handlePermissionStatusChange,
				);
			}
		};

		loadPermissions();

		return () => {
			if (permissionStatus != null) {
				permissionStatus.removeEventListener(
					"change",
					handlePermissionStatusChange,
				);
			}
		};
	}, []);

	return children;
};
