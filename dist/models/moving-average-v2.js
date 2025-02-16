export function movingAverage(data, windowSize) {
    if (windowSize > data.length || windowSize <= 0) {
        return [];
    }
    return Array.from({ length: data.length - windowSize + 1 }, function (_, i) {
        var window = data.slice(i, i + windowSize);
        var sum = window.reduce(function (acc, val) { return acc + val; }, 0);
        return sum / windowSize;
    });
}
