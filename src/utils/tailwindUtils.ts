import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigFile from "../../tailwind.config";

export const tailwindUtils = resolveConfig(tailwindConfigFile);

export const colors = tailwindUtils.theme.colors;
