export const roundToDecimals = (value: number, n: number) => {
	if (n < 0) {
		throw new Error("The number of decimals cannot be negative.");
	}
	const factor = Math.pow(10, n);
	return Math.round(value * factor) / factor;
};
