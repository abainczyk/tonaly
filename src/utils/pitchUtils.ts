export const comparePitch = (
	pianoPitch: number,
	userPitch: number,
	thresholdCents: number = 5,
): -1 | 0 | 1 => {
	// Calculate the threshold in frequency (Hertz) for the given piano pitch
	const thresholdFactor = Math.pow(2, thresholdCents / 1200) - 1;
	const lowerBound = pianoPitch * (1 - thresholdFactor);
	const upperBound = pianoPitch * (1 + thresholdFactor);

	// Compare user pitch with the calculated range
	if (userPitch < lowerBound) {
		return -1; // Too low
	} else if (userPitch > upperBound) {
		return 1; // Too high
	} else {
		return 0; // Within threshold
	}
};
