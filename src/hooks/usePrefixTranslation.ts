import { useTranslation } from "react-i18next";

export const usePrefixTranslation = (prefix: string) =>
	useTranslation("", { keyPrefix: prefix });
