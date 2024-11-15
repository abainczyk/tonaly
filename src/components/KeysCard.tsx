import { useRecoilValue } from "recoil";
import { Card, CardBody } from "@nextui-org/react";
import { currentPianoKeyState } from "../states/currentPianoKeyState.ts";
import { FC, useMemo } from "react";
import classNames from "classnames";
import { usePlayer } from "../hooks/usePlayer.ts";
import { PropsWithClassName } from "../types/propsWithClassName.ts";
import { usePianoKeys } from "../hooks/usePianoKeys.ts";

import { PianoKey } from "../types/pianoKey.ts";

export const KeysCard: FC<PropsWithClassName> = ({ className }) => {
	const currentPianoKey = useRecoilValue(currentPianoKeyState);
	const { pianoKeys } = usePianoKeys();
	const { play } = usePlayer();

	const keys: Array<PianoKey | undefined> = useMemo(() => {
		const emptyPrefix = Array(9).fill(undefined);
		const emptySuffix = Array(11).fill(undefined);
		return emptyPrefix.concat(pianoKeys, emptySuffix);
	}, [pianoKeys]);

	const getClassNames = (key?: PianoKey) => {
		if (key == null) {
			return "bg-gray-100 dark:bg-zinc-800";
		}

		const isActive = key.note === currentPianoKey?.note;
		return classNames("cursor-pointer", {
			"bg-primary text-white": isActive,
			"bg-gray-200 dark:bg-zinc-700": !isActive,
		});
	};

	const handleClick = (key?: PianoKey) => {
		if (key != null) {
			play(key);
		}
	};

	return (
		<Card className={className}>
			<CardBody className="flex justify-center items-center">
				<div className="grid grid-cols-12 gap-1">
					{keys.map((key, index) => (
						<div
							key={index}
							className={`p-2 flex items-center justify-center rounded-md select-none ${getClassNames(key)}`}
							style={{ fontSize: ".75rem" }}
							onClick={() => handleClick(key)}
						>
							{key?.localizedNote}
						</div>
					))}
				</div>
			</CardBody>
		</Card>
	);
};
