export const getMicrophonePermissionStatus = async () =>
	await navigator.permissions.query({ name: "microphone" as PermissionName });

export const checkMicrophoneSupported = async () =>
	navigator.mediaDevices?.getUserMedia != null;

export const checkMicrophonePermitted = async () => {
	try {
		const permissionStatus = await getMicrophonePermissionStatus();
		return permissionStatus.state === "granted";
	} catch {
		return false;
	}
};
