import { useRecoilState } from "recoil";
import { themeState } from "../states/themeState.ts";
import { Theme } from "../types/theme.ts";
import {
	applyTheme as updateTheme,
	preferredTheme,
} from "../utils/themeUtils.ts";

export const useThemeState = () => {
	const [theme, setTheme] = useRecoilState(themeState);

	const availableThemes = [Theme.LIGHT, Theme.DARK];

	const applyTheme = (theme: Theme) => {
		updateTheme(theme);
		setTheme(theme);
	};

	return {
		availableThemes,
		applyTheme,
		preferredTheme,
		theme,
	};
};
