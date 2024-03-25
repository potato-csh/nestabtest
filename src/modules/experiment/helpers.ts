export const genHashSet = (start: number = 0, end: number = 99) => {
    const hashSet = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return JSON.stringify(hashSet);
};
