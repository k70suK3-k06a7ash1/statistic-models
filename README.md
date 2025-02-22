# statistic-models

A collection of statistical models implemented in TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.0.42-blue)](https://www.npmjs.com/package/statistic-models)

## Overview

`statistic-models` is a TypeScript library that provides implementations of various statistical models located in the `src/models` directory, including:

*   **doubleExponentialSmoothingAdditive**: Implements the double exponential smoothing method with an additive trend.
    *   **Arguments:**
        *   `data`: `number[]` - Time series data.
        *   `alpha`: `number` - Smoothing factor for the level (0 < alpha <= 1).
        *   `beta`: `number` - Smoothing factor for the trend (0 < beta <= 1).
    *   **Returns:**
        *   `Object` - An object containing:
            *   `level`: `number[]` - Level of the time series at each point.
            *   `trend`: `number[]` - Trend of the time series at each point.
            *   `smoothedData`: `number[]` - Smoothed data at each point.
            *   `forecast`: `(steps: number) => number[]` - A function to forecast future values. Takes the number of steps as input and returns an array of forecasted values.
    *   **Usage:**
        ```typescript
        const data1 = [10, 12, 14, 18, 24, 30];
        const alpha1 = 0.5;
        const beta1 = 0.3;
        const result1 = doubleExponentialSmoothingAdditive(data1, alpha1, beta1);
        const forecastValues1 = result1.forecast(3);

        ```
*   **doubleExponentialSmoothingMultiplicative**: Applies the double exponential smoothing multiplicative method to a time series data.
    *   **Arguments:**
        *   `data`: `number[]` - The time series data as an array of numbers.
        *   `alpha`: `number` - The smoothing factor for the level (0 < alpha <= 1).
        *   `beta`: `number` - The smoothing factor for the trend (0 < beta <= 1).
    *   **Returns:**
        *   `Object` - An object containing:
            *   `level`: `number[]` - Level of the time series at each point.
            *   `trend`: `number[]` - Trend of the time series at each point.
            *   `smoothedData`: `number[]` - Smoothed data at each point.
            *   `forecast`: `(steps: number) => number[]` - A function to forecast future values. Takes the number of steps as input and returns an array of forecasted values.
    *   **Throws:**
        *   `Error` - If alpha or beta are not between 0 and 1.
        *   `Error` - If the data array contains less than two data points.
    *   **Usage:**
        ```typescript
        const data = [10, 12, 14, 18, 24, 30];
        const alpha = 0.5;
        const beta = 0.3;
        const result = doubleExponentialSmoothingMultiplicative(data, alpha, beta);
        const forecastValues = result.forecast(3);

        console.log(result.level);
        console.log(result.trend);
        console.log(result.smoothedData);

        console.log(forecastValues);
        ```
*   **exponentialMovingAverageForecast**: Forecasts future values using the exponential moving average method.
    *   **Arguments:**
        *   `data`: `number[]` - The time series data as an array of numbers.
        *   `smoothingFactor`: `number` - Smoothing factor (0 < smoothingFactor <= 1).
        *   `forecastHorizon`: `number` - Number of periods to forecast.
    *   **Returns:**
        *   `number[]` - An array of numbers representing the forecast for the given horizon.
    *   **Usage:**
        ```typescript
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const smoothingFactor = 0.8;
        const forecastHorizon = 2;
        const forecastValues = exponentialMovingAverageForecast(data, smoothingFactor, forecastHorizon);

        console.log(forecastValues);
        ```
*   **exponentialSmoothingForecast**: Forecasts future values using the exponential smoothing method.
    *   **Arguments:**
        *   `data`: `number[]` - The time series data as an array of numbers.
        *   `forecastHorizon`: `number` - Number of periods to forecast.
        *   `smoothingLevel`: `number` - Smoothing level (0 < smoothingLevel < 1). Defaults to 0.2.
    *   **Returns:**
        *   `number[]` - An array of numbers representing the forecast for the given horizon.
    *   **Usage:**
        ```typescript
        const data = [10, 12, 13, 11, 14, 17, 20, 18, 22, 25];
        const forecastHorizon = 3;
        const smoothingLevel = 0.2;
        const forecastValues = exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel);

        console.log(forecastValues);
        ```
*   **exponentialSmoothing**: Smoothes time series data using the exponential smoothing method.
    *   **Arguments:**
        *   `data`: `number[]` - The time series data as an array of numbers.
        *   `alpha`: `number` - Smoothing factor (0 < alpha <= 1).
    *   **Returns:**
        *   `number[]` - An array of numbers representing the smoothed data.
    *   **Usage:**
        ```typescript
        const data = [10, 12, 15, 13];
        const alpha = 0.5;
        const smoothedData = exponentialSmoothing(data, alpha);

        console.log(smoothedData);
        ```
*   **linearRegressionForecast**: Forecasts future values using linear regression.
    *   **Arguments:**
        *   `data`: `number[]` - The time series data as an array of numbers.
        *   `forecastHorizon`: `number` - Number of periods to forecast.
        *   `lag`: `number` - Lag value. Defaults to 1.
    *   **Returns:**
        *   `number[]` - An array of numbers representing the forecast for the given horizon.
    *   **Usage:**
        ```typescript
        const data = [10, 12, 15, 13, 18, 20, 22, 25];
        const forecastHorizon = 3;
        const lag = 2;

        const forecast = linearRegressionForecast(data, forecastHorizon, lag);

        console.log(forecast);
        ```
*   **movingAverageForecast**: Forecasts future values using the moving average method.
    *   **Arguments:**
        *   `data`: `number[]` - The time series data as an array of numbers.
        *   `windowSize`: `number` - Window size.
        *   `forecastHorizon`: `number` - Number of periods to forecast.
    *   **Returns:**
        *   `number[]` - An array of numbers representing the forecast for the given horizon.
    *   **Usage:**
        ```typescript
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const windowSize = 3;
        const forecastHorizon = 2;
        const forecastValues = movingAverageForecast(data, windowSize, forecastHorizon);

        console.log(forecastValues);
        ```
*   **movingAverage**: Calculates the moving average of time series data.
    *   **Arguments:**
        *   `data`: `number[]` - The time series data as an array of numbers.
        *   `windowSize`: `number` - Window size.
    *   **Returns:**
        *   `number[]` - An array of numbers representing the moving average of the data.
    *   **Usage:**
        ```typescript
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const windowSize = 3;
        const movingAverageValues = movingAverage(data, windowSize);

        console.log(movingAverageValues);
        ```
*   **StateSpaceModel**: Implements a state-space model.
    *   **Constructor Arguments:**
        *   `A`: `number[][]` - State transition matrix.
        *   `B`: `number[][]` - Input matrix.
        *   `C`: `number[][]` - Output matrix.
        *   `D`: `number[][]` - Direct transmission matrix.
        *   `initial_x`: `number[][]` - Initial state.
    *   **Methods:**
        *   `predict(u: number[][]): Matrix` - Predicts the next state given the input `u`.
        *   `observe(u: number[][]): Matrix` - Predicts the observed value given the input `u`.
        *   `update(y: number[][], u: number[][]): void` - Updates the state given the observed value `y` and the input `u`.
        *   `updateWithKalman(y: number[][], R: number[][], Q: number[][], P: number[][]): void` - Updates the state using a Kalman filter.
    *   **Usage:**
        ```typescript
        import { StateSpaceModel, Matrix } from "statistic-models";

        const A = [
          [1, 0],
          [0, 1],
        ];
        const B = [
          [1, 0],
          [0, 1],
        ];
        const C = [
          [1, 0],
          [0, 1],
        ];
        const D = [
          [0, 0],
          [0, 0],
        ];
        const initial_x = [[0], [0]];

        const model = new StateSpaceModel(A, B, C, D, initial_x);

        const u = [[1], [2]];
        const predictedState = model.predict(u);
        const observed = model.observe(u);

        console.log(predictedState);
        console.log(observed);
        ```
*   **TripleExponentialSmoothing**: Implements the triple exponential smoothing method.
    *   **Constructor Arguments:**
        *   `alpha`: `number` - Level smoothing constant (0 < alpha < 1).
        *   `beta`: `number` - Trend smoothing constant (0 < beta < 1).
        *   `gamma`: `number` - Seasonal smoothing constant (0 < gamma < 1).
        *   `period`: `number` - Seasonality period.
    *   **Methods:**
        *   `initialize(data: number[]): void` - Initializes the model with the given data.
        *   `forecast(steps: number): number[]` - Forecasts future values for the given number of steps.
        *   `train(newData: number[]): void` - Trains the model with new data.
        *   `update(newValue: number): void` - Updates the model with a new data point.
        *   `logState(): void` - Logs the current state of the model (for debugging).
    *   **Usage:**
        ```typescript
        import { TripleExponentialSmoothing } from "statistic-models";

        const alpha = 0.5;
        const beta = 0.3;
        const gamma = 0.2;
        const period = 4;
        const data = [10, 20, 15, 25, 12, 22, 18, 28, 14, 24, 19, 29];

        const model = new TripleExponentialSmoothing(alpha, beta, gamma, period);
        model.initialize(data);
        const forecastValues = model.forecast(4);

        console.log(forecastValues);
        ```
*   **VectorAutoregression**: Implements a vector autoregression (VAR) model.
    *   **Constructor Arguments:**
        *   `p`: `number` - Number of lags (how many past data points to use).
        *   `k`: `number` - Number of variables (number of time series).
    *   **Methods:**
        *   `prepareData(data: number[][]): { Y: Matrix; X: Matrix }` - Prepares the data for training.
        *   `fit(data: number[][]): void` - Fits the model to the given data.
        *   `predict(data: number[][], steps: number): number[][]` - Predicts future values for the given number of steps.
        *   `logState(): void` - Logs the current state of the model (for debugging).
    *   **Usage:**
        ```typescript
        import { VectorAutoregression } from "statistic-models";

        const data = [
          [1.0, 2.0],
          [1.5, 2.5],
          [1.3, 2.7],
          [1.8, 3.1],
          [2.0, 3.0],
          [2.2, 3.4],
          [2.5, 3.7],
          [2.3, 3.5],
          [2.8, 4.0],
          [3.0, 4.2],
        ];
        const p = 2;
        const k = 2;

        const varModel = new VectorAutoregression(p, k);
        varModel.fit(data);
        const steps = 3;
        const forecastValues = varModel.predict(data, steps);

        console.log(forecastValues);
        ```

This library is designed to be modular, easy to use, and well-tested.


## Installation

```bash
npm install statistic-models
```


License
MIT License

Copyright (c) 2024 Kyosuke Kobayashi
