import { Theme } from "../types/theme.ts";
import { THEME_KEY } from "../config/constants.ts";

const DARK_MODE_CLASS = "dark";

export const preferredTheme =
	window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
		? Theme.DARK
		: Theme.LIGHT;

export const applyTheme = (theme: Theme) => {
	if (theme === Theme.DARK) {
		document.body.classList.add(DARK_MODE_CLASS);
	} else {
		document.body.classList.remove(DARK_MODE_CLASS);
	}
};

export const initializeTheme = () => {
	try {
		const themeItem = localStorage.getItem(THEME_KEY);

		if (themeItem != null) {
			const parsedTheme = JSON.parse(themeItem);

			if (Object.values(Theme).includes(parsedTheme)) {
				applyTheme(parsedTheme);
				return;
			}
		}
	} catch (error) {
		console.error("Error parsing theme from localStorage:", error);
	}

	// Apply preferred theme if no valid theme is found
	applyTheme(preferredTheme);
};
