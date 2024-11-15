import { atom } from "recoil";
import { Theme } from "../types/theme.ts";
import { localStorageEffect } from "./effects.ts";
import { THEME_KEY } from "../config/constants.ts";
import { getPreferredTheme } from "../utils/mediaUtils.ts";

export const themeState = atom<Theme>({
	key: "theme",
	default: getPreferredTheme(),
	effects: [localStorageEffect(THEME_KEY)],
});
