import { FC, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPianoKeyState } from "../states/currentPianoKeyState.ts";
import { PitchDetector } from "pitchy";
import { Button, useDisclosure } from "@nextui-org/react";
import { audioInputDeviceSensitivityState, currentAudioInputDeviceState, } from "../states/audioInputDevicesState.ts";
import { usePianoKeys } from "../hooks/usePianoKeys.ts";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { usePrefixTranslation } from "../hooks/usePrefixTranslation.ts";
import { AlertModal } from "./AlertModal.tsx";
import { currentPitchState } from "../states/currentPitchState.ts";
import { microphoneSupportedState, } from "../states/microphoneState.ts";
import { displayDurationState } from "../states/displayDurationState.tsx";

const FFT_SIZE = 4096;
const SKIP_EVERY_N_AUDIO_SIGNALS = 10;

let delayedPitchTimeout: number | undefined;
let audioSignalsSkipped = 0;

export const RecordButton: FC = () => {
	const setCurrentPianoKey = useSetRecoilState(currentPianoKeyState);
	const setCurrentPitch = useSetRecoilState(currentPitchState);
	const selectedAudioInputDevice = useRecoilValue(currentAudioInputDeviceState);
	const microphoneSupported = useRecoilValue(microphoneSupportedState);
	const displayDuration = useRecoilValue(displayDurationState);
	const sensitivity = useRecoilValue(audioInputDeviceSensitivityState);
	const [isRecording, setIsRecording] = useState(false);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const bufferRef = useRef<Float32Array | null>(null);
	const animationIdRef = useRef<number | null>(null);
	const { t } = usePrefixTranslation("components.RecordButton");
	const { findClosestPianoKey } = usePianoKeys();
	const mediaDevicesNotSupportedDisclosure = useDisclosure();
	const mediaDevicesNotPermittedDisclosure = useDisclosure();

	const startRecording = async () => {
		if (!microphoneSupported) {
			mediaDevicesNotSupportedDisclosure.onOpen();
			return;
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: { deviceId: { exact: selectedAudioInputDevice?.deviceId } },
			});

			audioContextRef.current = new AudioContext();
			const source = audioContextRef.current.createMediaStreamSource(stream);

			analyserRef.current = audioContextRef.current.createAnalyser();
			analyserRef.current.fftSize = FFT_SIZE;
			source.connect(analyserRef.current);
			bufferRef.current = new Float32Array(analyserRef.current.fftSize);

			setIsRecording(true);
			detectPitch();
		} catch (error) {
			console.error("Error starting audio recording: ", error);
			if (error instanceof DOMException && error.name === "NotAllowedError") {
				mediaDevicesNotPermittedDisclosure.onOpen();
			}
		}
	};

	const stopRecording = async () => {
		if (audioContextRef.current) {
			await audioContextRef.current.close();
		}

		if (animationIdRef.current) {
			cancelAnimationFrame(animationIdRef.current);
		}

		setIsRecording(false);
		setCurrentPianoKey(undefined);
		setCurrentPitch(undefined);
	};

	const detectPitch = () => {
		const doDetectPitch =
			audioSignalsSkipped % SKIP_EVERY_N_AUDIO_SIGNALS === 0;
		if (
			doDetectPitch &&
			analyserRef.current &&
			bufferRef.current &&
			audioContextRef.current
		) {
			audioSignalsSkipped = 0;
			analyserRef.current.getFloatTimeDomainData(bufferRef.current);

			const detector = PitchDetector.forFloat32Array(bufferRef.current.length);
			const [pitch, clarity] = detector.findPitch(
				bufferRef.current,
				audioContextRef.current.sampleRate,
			);

			if (clarity > sensitivity) {
				window.clearTimeout(delayedPitchTimeout);
				const note = findClosestPianoKey(pitch);
				setCurrentPianoKey(note);
				setCurrentPitch(pitch);
				if (displayDuration !== Infinity) {
					delayedPitchTimeout = window.setTimeout(() => {
						setCurrentPianoKey(undefined);
						setCurrentPitch(undefined);
					}, displayDuration);
				}
			}
		}

		audioSignalsSkipped++;
		animationIdRef.current = requestAnimationFrame(detectPitch);
	};

	useEffect(() => {
		if (isRecording) {
			stopRecording();
			startRecording();
		}

		return () => {
			stopRecording();
		};
	}, [sensitivity, selectedAudioInputDevice]);

	return (
		<>
			<div className="flex flex-grow sm:flex-grow-0">
				{!isRecording && (
					<Button
						startContent={<PlayCircleIcon />}
						color="primary"
						onPress={startRecording}
						aria-label={t("startRecording")}
						fullWidth
					>
						{t("startRecording")}
					</Button>
				)}
				{isRecording && (
					<Button
						startContent={<StopCircleIcon />}
						color="warning"
						onPress={stopRecording}
						aria-label={t("stopRecording")}
						fullWidth
					>
						{t("stopRecording")}
					</Button>
				)}
			</div>
			<AlertModal
				title={t("mediaDevicesNotSupportedAlert.title")}
				description={t("mediaDevicesNotSupportedAlert.description")}
				disclosure={mediaDevicesNotSupportedDisclosure}
			/>
			<AlertModal
				title={t("mediaDevicesNotPermittedAlert.title")}
				description={t("mediaDevicesNotPermittedAlert.description")}
				disclosure={mediaDevicesNotPermittedDisclosure}
			/>
		</>
	);
};
