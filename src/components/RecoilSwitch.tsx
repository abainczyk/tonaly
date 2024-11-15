import { Switch, SwitchProps } from "@nextui-org/react";
import { RecoilState, useRecoilState } from "recoil";
import { ChangeEvent, FC } from "react";

interface RecoilSwitchProps extends Omit<SwitchProps, "checked"> {
	state: RecoilState<boolean>;
	label: string;
}

export const RecoilSwitch: FC<RecoilSwitchProps> = ({
	state,
	label,
	...props
}) => {
	const [value, setValue] = useRecoilState(state);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.checked);
		props.onChange?.(e);
	};

	return (
		<Switch {...props} checked={value} onChange={handleChange}>
			{label}
		</Switch>
	);
};
