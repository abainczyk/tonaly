import { useTranslation } from "react-i18next";
import { FC, PropsWithChildren, useEffect } from "react";
import { noteTranslations, pianoKeys } from "../states/pianoKeys.ts";
import { useSetRecoilState } from "recoil";
import { pianoKeysState } from "../states/pianoKeysState.ts";

// Translate notes based on selected language
const translateNote = (note: string, language: string): string => {
	const translations = noteTranslations[language];
	return translations && translations[note] ? translations[note] : note;
};

export const PianoKeysProvider: FC<PropsWithChildren> = ({ children }) => {
	const setPianoKeys = useSetRecoilState(pianoKeysState);
	const { i18n } = useTranslation();

	useEffect(() => {
		const currentLanguage = i18n.language;

		const updatedKeys = pianoKeys.map((key) => ({
			...key,
			localizedNote:
				translateNote(key.note[0], currentLanguage) + key.note.slice(1), // Translate note letter, keep rest of the note
		}));

		setPianoKeys(updatedKeys);
	}, [i18n.language]);

	return children;
};
