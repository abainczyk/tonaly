import { Select, SelectItem } from "@nextui-org/react";
import { usePrefixTranslation } from "../hooks/usePrefixTranslation.ts";
import { useRecoilState } from "recoil";
import { displayDurationState } from "../states/displayDurationState.tsx";

interface DurationItem {
	duration: number;
	label: string;
	key: string;
}

export const DisplayDurationSelect = () => {
	const { t } = usePrefixTranslation("components.DisplayDurationSelect");
	const [displayDuration, setDisplayDuration] =
		useRecoilState(displayDurationState);

	const durationItems: DurationItem[] = [
		{ key: "two", duration: 2000, label: t("twoSeconds") },
		{ key: "five", duration: 5000, label: t("fiveSeconds") },
		{ key: "ten", duration: 10000, label: t("tenSeconds") },
		{ key: "infinite", duration: Infinity, label: t("infinite") },
	];

	const selectedItem = durationItems.find(
		(i) => i.duration === displayDuration,
	);

	const handleChange = (currentKey?: string) => {
		const newDuration =
			currentKey != null
				? durationItems.find((i) => i.key === currentKey)?.duration
				: undefined;
		setDisplayDuration(newDuration ?? Infinity);
	};

	return (
		<Select
			items={durationItems}
			label={t("label")}
			aria-label={t("label")}
			selectedKeys={selectedItem != null ? [selectedItem.key] : []}
			onSelectionChange={({ currentKey }) => handleChange(currentKey)}
		>
			{({ key, label }) => (
				<SelectItem key={key} aria-label={label}>
					{label}
				</SelectItem>
			)}
		</Select>
	);
};
