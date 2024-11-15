import { FC, PropsWithChildren } from "react";
import classNames from "classnames";
import { WarningAmber } from "@mui/icons-material";

export type Severity = "warning";

export interface AlertProps extends PropsWithChildren {
	severity: Severity;
	title?: string;
}

export const Alert: FC<AlertProps> = ({ severity, title, children }) => {
	const alertClassNames = classNames({
		"bg-warning/20 text-amber-800/90 dark:text-warning/90":
			severity === "warning",
	});

	return (
		<div className={`rounded-xl py-2 px-3 flex gap-3 ${alertClassNames}`}>
			<WarningAmber fontSize="small" />
			<div className="flex-grow">
				{title && <p className="font-bold">{title}</p>}
				<p>{children}</p>
			</div>
		</div>
	);
};
