export const scrollToElementWithinContainer = <T extends HTMLElement>(
	container: T,
	element: T,
) => {
	if (!container.contains(element)) {
		throw Error("Element is not inside the container");
	}

	// Calculate the left offset of the element relative to the container
	const leftOffset = element.offsetLeft - container.offsetLeft;

	// Calculate the scroll position to center the element in the container
	const scrollLeft =
		leftOffset - container.clientWidth / 2 + element.clientWidth / 2;

	container.scrollTo({
		behavior: "smooth",
		left: scrollLeft,
	});
};
