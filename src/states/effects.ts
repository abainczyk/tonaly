import { AtomEffect } from "recoil";

export const localStorageEffect =
	<T>(
		key: string,
		options?: {
			serialize?: (value: T) => string;
			deserialize?: (value: string) => T;
		},
	): AtomEffect<T> =>
	({ setSelf, onSet }) => {
		const serialize = options?.deserialize ?? JSON.parse;
		const deserialize = options?.serialize ?? JSON.stringify;

		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(serialize(savedValue));
		}

		onSet((newValue, _, isReset) => {
			if (isReset) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, deserialize(newValue));
			}
		});
	};
