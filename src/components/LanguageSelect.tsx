import { Select, SelectItem } from "@nextui-org/react";
import i18next from "i18next";
import { usePrefixTranslation } from "../hooks/usePrefixTranslation.ts";
import { useRecoilValue } from "recoil";
import { languagesState } from "../states/languagesState.ts";
import _ from "lodash";

export const LanguageSelect = () => {
	const { t } = usePrefixTranslation("components.LanguageSelect");
	const languages = useRecoilValue(languagesState);

	const handleChangeLanguage = async (language?: string) =>
		await i18next.changeLanguage(language);

	const sortedAndTranslatedLanguages = _(languages)
		.map(({ key }) => ({
			key,
			label: t(`languages.${key}`),
		}))
		.sortBy("label")
		.value();

	return (
		<Select
			items={sortedAndTranslatedLanguages}
			label={t("label")}
			aria-label={t("label")}
			selectedKeys={[i18next.resolvedLanguage ?? i18next.language]}
			onSelectionChange={({ currentKey }) => handleChangeLanguage(currentKey)}
		>
			{({ key, label }) => (
				<SelectItem key={key} aria-label={label}>
					{label}
				</SelectItem>
			)}
		</Select>
	);
};
