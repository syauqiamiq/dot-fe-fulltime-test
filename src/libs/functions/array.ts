export function chunk(arr: any[], chunkSize = 1) {
	const tmp = [...arr];
	const cache = [];

	if (arr.length < chunkSize) {
		return [arr];
	}

	while (tmp.length) cache.push(tmp.splice(0, chunkSize));
	return cache;
}

export function shuffler<T>(array: T[]) {
	let m = array.length,
		t,
		i;

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}
