import { selector } from "recoil";
import i18next from "i18next";

export const languagesState = selector<{ key: string }[]>({
	key: "languages",
	get: () =>
		[...i18next.languages].sort().map((language) => ({ key: language })),
});
