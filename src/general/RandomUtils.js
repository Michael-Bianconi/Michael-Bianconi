/**
 * Randomly selects up to n unique items from the list which are accepted by the predicate.
 * @param list List of elements to search from.
 * @param predicate Predicate to use (returns true if the element can be included in the output).
 * @param n The number of elements to return.
 * @return {Array} A list of size n or less.
 */
export function selectRandom(list, predicate, n) {
    return shuffle(list.filter(predicate)).slice(0, n);
}

/**
 * Randomly selects n elements from a 2d array.
 * @see selectRandom
 */
export function selectRandom2d(grid, predicate, n) {
    return selectRandom(grid.flat(), predicate, n);
}

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}