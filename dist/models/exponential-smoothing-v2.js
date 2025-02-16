export function exponentialSmoothing(data, alpha) {
    if (alpha <= 0 || alpha > 1) {
        throw new Error("Alpha must be between 0 and 1.");
    }
    var smoothedData = [];
    for (var i = 0; i < data.length; i++) {
        var previousSmoothedValue = i === 0 ? data[i] : smoothedData[i - 1];
        var smoothedValue = alpha * data[i] + (1 - alpha) * previousSmoothedValue;
        smoothedData.push(smoothedValue);
    }
    return smoothedData;
}
