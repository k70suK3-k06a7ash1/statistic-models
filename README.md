# statistic-models

A collection of statistical models implemented in TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.0.39-blue)](https://www.npmjs.com/package/statistic-models)

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
*   **doubleExponentialSmoothingMultiplicative**: Implements the double exponential smoothing method with a multiplicative trend.
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
*   **exponentialMovingAverageForecast**: Forecasts future values using the exponential moving average method.
    *   **Arguments:**
        *   `data`: `number[]` - Time series data.
        *   `smoothingFactor`: `number` - Smoothing factor (0 < smoothingFactor <= 1).
        *   `forecastHorizon`: `number` - Number of periods to forecast.
    *   **Returns:**
        *   `number[]` - An array of numbers representing the forecast for the given horizon.
*   **exponentialSmoothingForecast**: Forecasts future values using the exponential smoothing method.
    *   **Arguments:**
        *   `data`: `number[]` - Time series data.
        *   `forecastHorizon`: `number` - Number of periods to forecast.
        *   `smoothingLevel`: `number` - Smoothing level (0 < smoothingLevel < 1). Defaults to 0.2.
    *   **Returns:**
        *   `number[]` - An array of numbers representing the forecast for the given horizon.
*   **exponentialSmoothing**: Smoothes time series data using the exponential smoothing method.
    *   **Arguments:**
        *   `data`: `number[]` - Time series data.
        *   `alpha`: `number` - Smoothing factor (0 < alpha <= 1).
    *   **Returns:**
        *   `number[]` - An array of numbers representing the smoothed data.
*   **linearRegressionForecast**: Forecasts future values using linear regression.
    *   **Arguments:**
        *   `data`: `number[]` - Time series data.
        *   `forecastHorizon`: `number` - Number of periods to forecast.
        *   `lag`: `number` - Lag value. Defaults to 1.
    *   **Returns:**
        *   `number[]` - An array of numbers representing the forecast for the given horizon.
*   **movingAverageForecast**: Forecasts future values using the moving average method.
    *   **Arguments:**
        *   `data`: `number[]` - Time series data.
        *   `windowSize`: `number` - Window size.
        *   `forecastHorizon`: `number` - Number of periods to forecast.
    *   **Returns:**
        *   `number[]` - An array of numbers representing the forecast for the given horizon.
*   **movingAverage**: Calculates the moving average of time series data.
    *   **Arguments:**
        *   `data`: `number[]` - Time series data.
        *   `windowSize`: `number` - Window size.
    *   **Returns:**
        *   `number[]` - An array of numbers representing the moving average of the data.
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
*   **VectorAutoregression**: Implements a vector autoregression (VAR) model.
    *   **Constructor Arguments:**
        *   `p`: `number` - Number of lags (how many past data points to use).
        *   `k`: `number` - Number of variables (number of time series).
    *   **Methods:**
        *   `prepareData(data: number[][]): { Y: Matrix; X: Matrix }` - Prepares the data for training.
        *   `fit(data: number[][]): void` - Fits the model to the given data.
        *   `predict(data: number[][], steps: number): number[][]` - Predicts future values for the given number of steps.
        *   `logState(): void` - Logs the current state of the model (for debugging).

This library is designed to be modular, easy to use, and well-tested.

## Usage

```typescript
// doubleExponentialSmoothingAdditive
import { doubleExponentialSmoothingAdditive } from "src/models/double-exponential-smoothing-additive-v2";

const data1 = [10, 12, 14, 18, 24, 30];
const alpha1 = 0.5;
const beta1 = 0.3;
const result1 = doubleExponentialSmoothingAdditive(data1, alpha1, beta1);
const forecastValues1 = result1.forecast(3);

// doubleExponentialSmoothingMultiplicative
import { doubleExponentialSmoothingMultiplicative } from "src/models/double-exponential-smoothing-multiplicative-v2";

const data2 = [10, 12, 14, 18, 24, 30];
const alpha2 = 0.5;
const beta2 = 0.3;
const result2 = doubleExponentialSmoothingMultiplicative(data2, alpha2, beta2);
const forecastValues2 = result2.forecast(3);

// exponentialMovingAverageForecast
import { exponentialMovingAverageForecast } from "src/models/exponential-moving-average-forecast-v2";

const data3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const smoothingFactor3 = 0.8;
const forecastHorizon3 = 2;
const forecastValues3 = exponentialMovingAverageForecast(data3, smoothingFactor3, forecastHorizon3);

// exponentialSmoothingForecast
import { exponentialSmoothingForecast } from "src/models/exponential-smoothing-forecast-v2";

const data4 = [10, 12, 13, 11, 14, 17, 20, 18, 22, 25];
const forecastHorizon4 = 3;
const smoothingLevel4 = 0.2;
const forecastValues4 = exponentialSmoothingForecast(data4, forecastHorizon4, smoothingLevel4);

// exponentialSmoothing
import { exponentialSmoothing } from "src/models/exponential-smoothing-v2";

const data5 = [10, 12, 15, 13];
const alpha5 = 0.5;
const smoothedData5 = exponentialSmoothing(data5, alpha5);

// linearRegressionForecast
import { linearRegressionForecast } from "src/models/linear-regression-forecast-v2";

const data6 = [10, 12, 15, 13, 18, 20, 22, 25];
const forecastHorizon6 = 3;
const lag6 = 2;

const forecast6 = linearRegressionForecast(data6, forecastHorizon6, lag6);

// movingAverageForecast
import { movingAverageForecast } from "src/models/moving-average-forecast-v2";

const data7 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const windowSize7 = 3;
const forecastHorizon7 = 2;
const forecastValues7 = movingAverageForecast(data7, windowSize7, forecastHorizon7);

// movingAverage
import { movingAverage } from "src/models/moving-average-v2";

const data8 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const windowSize8 = 3;
const movingAverageValues8 = movingAverage(data8, windowSize8);

// StateSpaceModel
import { StateSpaceModel } from "src/models/state-space-model-v2";
import { Matrix } from "src/helpers/Matrix";

const A9 = [
  [1, 0],
  [0, 1],
];
const B9 = [
  [1, 0],
  [0, 1],
];
const C9 = [
  [1, 0],
  [0, 1],
];
const D9 = [
  [0, 0],
  [0, 0],
];
const initial_x9 = [[0], [0]];

const model9 = new StateSpaceModel(A9, B9, C9, D9, initial_x9);

const u9 = [[1], [2]];
const predictedState9 = model9.predict(u9);
const observed9 = model9.observe(u9);

// TripleExponentialSmoothing
import { TripleExponentialSmoothing } from "src/models/triple-exponential-smoothing-v2";

const alpha10 = 0.5;
const beta10 = 0.3;
const gamma10 = 0.2;
const period10 = 4;
const data10 = [10, 20, 15, 25, 12, 22, 18, 28, 14, 24, 19, 29];

const model10 = new TripleExponentialSmoothing(alpha10, beta10, gamma10, period10);
model10.initialize(data10);
const forecastValues10 = model10.forecast(4);

// VectorAutoregression
import { VectorAutoregression } from "src/models/vector-autoregression-v2";

const data11 = [
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
const p11 = 2;
const k11 = 2;

const varModel11 = new VectorAutoregression(p11, k11);
varModel11.fit(data11);
const steps11 = 3;
const forecastValues11 = varModel11.predict(data11, steps11);
```

## Installation

```bash
npm install statistic-models
```


License
MIT License

Copyright (c) 2024 Kyosuke Kobayashi
