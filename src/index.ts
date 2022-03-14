/**
 * Returns a generator of parent elements in the path of the
 * specified element from bottom to top, with an option to filter
 * out elements or limit the search.
 * @param origin The lowest element to start with.
 * @param options Optional configuration for matching elements.
 * @returns A generator that yields matching elements
 */
export function* matchElements<T extends Element>(
	origin: T,
	options: {
		destination?: Element | string;
		match?: (node: Element) => boolean;
	} = {},
): Generator<T, void, unknown> {
	const {destination, match = (node) => !!node} = options;
	const upperLimit =
		(typeof destination === 'string' ? document.querySelector(destination) : destination) ??
		document.body;

	if (match(origin)) {
		yield origin;
	}

	if (origin === upperLimit || !origin.parentElement) {
		return;
	}

	yield* matchElements(origin.parentElement as unknown as T, {
		destination: upperLimit,
		match,
	});
}
