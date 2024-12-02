import { atom } from "recoil";
import { Theme } from "../types/theme.ts";
import { localStorageEffect } from "./effects.ts";
import { THEME_KEY } from "../config/constants.ts";
import { preferredTheme } from "../utils/themeUtils.ts";

export const themeState = atom<Theme>({
	key: "theme",
	default: preferredTheme,
	effects: [localStorageEffect(THEME_KEY)],
});
