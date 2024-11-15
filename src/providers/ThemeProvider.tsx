import { FC, PropsWithChildren, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { themeState } from "../states/themeState.ts";
import { useThemeState } from "../hooks/useThemeState.tsx";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	const { applyTheme } = useThemeState();
	const theme = useRecoilValue(themeState);

	useEffect(() => {
		applyTheme(theme);
	}, []);

	return children;
};
