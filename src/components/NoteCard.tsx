import { FC, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { currentPianoKeyState } from "../states/currentPianoKeyState.ts";
import {
	Accidental,
	Clef,
	ElementStyle,
	Formatter,
	Renderer,
	Stave,
	StaveNote,
} from "vexflow";
import { Card, CardBody } from "@nextui-org/react";
import { PropsWithClassName } from "../types/propsWithClassName.ts";
import { usePianoKeys } from "../hooks/usePianoKeys.ts";
import classNames from "classnames";
import { useThemeState } from "../hooks/useThemeState.tsx";
import { colors } from "../utils/tailwindUtils.ts";
import { PianoKey } from "../types/pianoKey.ts";
import { Theme } from "../types/theme.ts";
import { usePlayer } from "../hooks/usePlayer.ts";

export const NoteCard: FC<PropsWithClassName> = ({ className }) => {
	const currentNote = useRecoilValue(currentPianoKeyState);
	const { getPianoKeyWindow } = usePianoKeys();
	const { theme } = useThemeState();
	const { play } = usePlayer();

	const containerRef = useRef<HTMLDivElement | null>(null);

	const getBaseStyle = (): ElementStyle =>
		theme === Theme.DARK
			? { fillStyle: "#555", strokeStyle: "#555" }
			: { fillStyle: "#000", strokeStyle: "#000" };

	const getNoteStyle = (): ElementStyle =>
		theme === Theme.DARK
			? { fillStyle: colors.blue["500"], strokeStyle: colors.blue["500"] }
			: {};

	const getClefStyle = (): ElementStyle =>
		theme === Theme.DARK
			? { fillStyle: colors.gray["400"], strokeStyle: colors.gray["400"] }
			: {};

	useEffect(() => {
		if (!containerRef.current) return;

		containerRef.current.innerHTML = "";

		const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
		renderer.resize(240, 300);
		const context = renderer
			.getContext()
			.setFillStyle(getBaseStyle().fillStyle!)
			.setStrokeStyle(getBaseStyle().strokeStyle!);

		const stave = new Stave(10, 80, 220)
			.addKeySignature("C")
			.setStyle(getBaseStyle())
			.addModifier(new Clef("treble").setStyle(getClefStyle()))
			.setContext(context)
			.draw();

		if (currentNote) {
			const note = new StaveNote({
				keys: [currentNote.vexFlowNote],
				auto_stem: true,
				align_center: true,
				duration: "q",
			}).setStyle(getNoteStyle());

			if (currentNote.isBlack) {
				note.addModifier(new Accidental("#"), 0);
			}

			Formatter.FormatAndDraw(context, stave, [note]);
		}
	}, [currentNote, theme]);

	const pianoKeyWindow =
		currentNote != null
			? getPianoKeyWindow(currentNote, 2)
			: ([...Array(5)] as PianoKey[]);

	return (
		<Card className={className}>
			<CardBody className="flex justify-center items-center">
				<div ref={containerRef} className="mb-3" />
				<div className="grid grid-cols-5 gap-1 items-stretch w-full">
					{pianoKeyWindow.map((key, index) => {
						const active = key?.note === currentNote?.note;
						const classes = classNames({
							"bg-gray-100 dark:bg-zinc-800": key == null,
							"hover:cursor-pointer": key != null,
							"bg-gray-200 dark:bg-zinc-700": key != null && !active,
							"bg-primary dark:bg-primary text-white": key != null && active,
						});
						return (
							<div
								className={`p-2 flex items-center justify-center rounded-lg ${classes}`}
								key={index}
								onClick={() => key && play(key)}
							>
								{key?.localizedNote ?? <span>&nbsp;</span>}
							</div>
						);
					})}
				</div>
			</CardBody>
		</Card>
	);
};
