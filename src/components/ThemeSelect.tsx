import { usePrefixTranslation } from "../hooks/usePrefixTranslation.ts";
import { Select, SelectItem } from "@nextui-org/react";
import { useThemeState } from "../hooks/useThemeState.tsx";

import { Theme } from "../types/theme.ts";

export const ThemeSelect = () => {
	const { t } = usePrefixTranslation("components.ThemeSelect");
	const { t: enumT } = usePrefixTranslation("enums.Theme");
	const { availableThemes, preferredTheme, theme, applyTheme } =
		useThemeState();

	const items = availableThemes.map((theme) => ({ theme }));

	return (
		<Select
			items={items}
			label={t("label")}
			aria-label={t("label")}
			selectedKeys={[theme]}
			onSelectionChange={({ currentKey }) =>
				applyTheme((currentKey as Theme) ?? preferredTheme)
			}
		>
			{({ theme }) => (
				<SelectItem key={theme} aria-label={enumT(theme)}>
					{enumT(theme)} {theme === preferredTheme && `(${t("default")})`}
				</SelectItem>
			)}
		</Select>
	);
};
