import { useRecoilState } from "recoil";
import { themeState } from "../states/themeState.ts";
import { Theme } from "../types/theme.ts";
import { getPreferredTheme } from "../utils/mediaUtils.ts";

const DARK_MODE_CLASS = "dark";

export const useThemeState = () => {
	const [theme, setTheme] = useRecoilState(themeState);

	const availableThemes = [Theme.LIGHT, Theme.DARK];

	const preferredTheme = getPreferredTheme();

	const applyTheme = (theme: Theme) => {
		if (theme === Theme.DARK) {
			document.body.classList.add(DARK_MODE_CLASS);
		} else {
			document.body.classList.remove(DARK_MODE_CLASS);
		}
		setTheme(theme);
	};

	return {
		availableThemes,
		applyTheme,
		preferredTheme,
		theme,
	};
};
