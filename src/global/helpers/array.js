export const batchedArray = (array, batchSize) => {
    return array.reduce((acc, item, index) => {
        const chunkIndex = Math.floor(index / batchSize);
        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(item);
        return acc;
    }, []);
};