# statistic-models

A collection of statistical models implemented in TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.0.38-blue)](https://www.npmjs.com/package/statistic-models)

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

## Installation

```bash
npm install statistic-models
```


License
MIT License

Copyright (c) 2024 Kyosuke Kobayashi
