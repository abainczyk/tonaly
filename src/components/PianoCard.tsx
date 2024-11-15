import { useRecoilValue } from "recoil";
import { currentPianoKeyState } from "../states/currentPianoKeyState.ts";
import { Card, CardBody, ScrollShadow, Tooltip } from "@nextui-org/react";
import { FC, MutableRefObject, useEffect, useRef } from "react";
import classNames from "classnames";
import { usePlayer } from "../hooks/usePlayer.ts";
import { usePianoKeys } from "../hooks/usePianoKeys.ts";
import { scrollToElementWithinContainer } from "../utils/scrollUtils.ts";
import { PianoKey } from "../types/pianoKey.ts";

export const PianoCard = () => {
	const currentNote = useRecoilValue(currentPianoKeyState);
	const { pianoKeys } = usePianoKeys();
	const { play } = usePlayer();
	const keysRefs = useRef(new Map<string, HTMLElement>());
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (
			currentNote?.note != null &&
			keysRefs.current != null &&
			cardRef.current != null
		) {
			const container = cardRef.current!;
			const element = keysRefs.current.get(currentNote.note)!;

			scrollToElementWithinContainer(container, element);
		}
	}, [currentNote]);

	return (
		<Card>
			<CardBody>
				<ScrollShadow orientation="horizontal" ref={cardRef}>
					<div className="px-1">
						<div className="flex">
							<div className="inline-flex mx-auto relative">
								{pianoKeys.map((key) => {
									const isActive = key.note === currentNote?.note;
									if (key.isBlack) {
										return (
											<BlackKey
												key={key.note}
												pianoKey={key}
												active={isActive}
												keysRefs={keysRefs}
												onClick={() => play(key)}
											/>
										);
									} else {
										return (
											<WhiteKey
												key={key.note}
												pianoKey={key}
												active={isActive}
												keysRefs={keysRefs}
												onClick={() => play(key)}
											/>
										);
									}
								})}
							</div>
						</div>
					</div>
				</ScrollShadow>
			</CardBody>
		</Card>
	);
};

interface KeyProps {
	pianoKey: PianoKey;
	active: boolean;
	onClick: () => void;
	keysRefs: MutableRefObject<Map<string, HTMLElement | null>>;
}

const WhiteKey: FC<KeyProps> = ({ pianoKey, active, keysRefs, onClick }) => {
	const keyClassNames = classNames({
		"bg-white border-black hover:bg-gray-100 text-zinc-800": !active,
		"bg-primary border-primary text-white": active,
	});

	return (
		<Tooltip showArrow={true} content={pianoKey.localizedNote}>
			<div
				className={`border-1 ml-[-1px] w-[32px] sm:w-[24px] h-[120px] cursor-pointer rounded-b shadow-md flex justify-center items-end pb-1 ${keyClassNames}`}
				ref={(el) => keysRefs.current.set(pianoKey.note, el)}
				onClick={onClick}
			>
				<span className="text-sm sm:invisible">{pianoKey.localizedNote}</span>
			</div>
		</Tooltip>
	);
};

const BlackKey: FC<KeyProps> = ({ pianoKey, active, keysRefs, onClick }) => {
	const keyClassNames = classNames({
		"bg-black dark:bg-zinc-900": !active,
		"bg-primary": active,
	});

	return (
		<Tooltip showArrow={true} content={pianoKey.localizedNote}>
			<div
				className="relative"
				ref={(el) => keysRefs.current.set(pianoKey.localizedNote, el)}
			>
				<div
					className={`w-[24px] sm:w-[18px] h-[80px] absolute top-0 left-[-12px] sm:left-[-9px] cursor-pointer z-10 rounded-b shadow-md ${keyClassNames}`}
					onClick={onClick}
				/>
			</div>
		</Tooltip>
	);
};
