import { Card, CardBody, Chip } from "@nextui-org/react";
import { FC } from "react";
import { PropsWithClassName } from "../types/propsWithClassName.ts";
import { useRecoilValue } from "recoil";
import { currentRoundedPitchState } from "../states/currentPitchState.ts";
import classNames from "classnames";
import { usePianoKeys } from "../hooks/usePianoKeys.ts";
import { comparePitch } from "../utils/pitchUtils.ts";
import { usePrefixTranslation } from "../hooks/usePrefixTranslation.ts";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const THRESHOLD_CENTS = 25;

export const PitchCard: FC<PropsWithClassName> = ({ className }) => {
	const { findClosestPianoKey } = usePianoKeys();
	const pitch = useRecoilValue(currentRoundedPitchState) ?? 0;

	// Determine the closest key and comparison result
	const closestKey = pitch > 0 ? findClosestPianoKey(pitch) : undefined;
	const comparePitchResult = closestKey
		? comparePitch(closestKey.frequency, pitch, THRESHOLD_CENTS)
		: undefined;

	// Dynamic class for the pitch
	const pitchClassNames = classNames("text-2xl font-bold", {
		"text-gray-200 dark:text-zinc-700": pitch === 0,
		"text-primary": pitch > 0,
	});

	return (
		<Card className={className}>
			<CardBody className="flex justify-center items-center gap-3">
				<span className={pitchClassNames}>{pitch} Hz</span>
				{closestKey && <PitchCompareResultChip result={comparePitchResult} />}
			</CardBody>
		</Card>
	);
};

interface PitchCompareResultChipProps {
	result?: -1 | 0 | 1;
}

const PitchCompareResultChip: FC<PitchCompareResultChipProps> = ({
	result,
}) => {
	const { t } = usePrefixTranslation("components.PitchCard");

	switch (result) {
		case -1:
			return (
				<Chip
					variant="flat"
					color="warning"
					endContent={<KeyboardDoubleArrowUpIcon fontSize="small" />}
				>
					{t("tooLow")}
				</Chip>
			);
		case 1:
			return (
				<Chip
					variant="flat"
					color="warning"
					endContent={<KeyboardDoubleArrowDownIcon fontSize="small" />}
				>
					{t("tooHigh")}
				</Chip>
			);
		case 0:
			return (
				<Chip variant="flat" color="success">
					{t("perfect")}
				</Chip>
			);
		default:
			return null;
	}
};
